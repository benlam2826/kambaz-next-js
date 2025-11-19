"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store";
import type { Module } from "./reducer";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { setModules, editModule, updateModule as updateModuleReducer, } from "./reducer";
import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState<string>("");
  const { modules } = useSelector((s: RootState) => s.modulesReducer);
  const dispatch = useDispatch();
  const fetchModules = async () => {
    if (!cid) return;
    const serverModules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(serverModules));
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    if (!moduleName.trim()) return;

    const newModule = await client.createModuleForCourse(cid as string, {
      name: moduleName,
      course: cid,
    });

    dispatch(setModules([...modules, newModule]));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: Module) => {
    await client.updateModule(module);
    const newModules = modules.map((m) =>
      m._id === module._id ? module : m
    );
    dispatch(setModules(newModules));
  };

  return (
    <div id="wd-modules-page" className="container">
      <h3>Modules</h3>
      <div className="mb-3">
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      </div>
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: Module) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && (
                <span className="me-auto">{module.name}</span>
              )}
              {module.editing && (
                <FormControl
                  className="w-50 d-inline-block me-auto"
                  value={module.name}
                  onChange={(e) =>
                    dispatch(
                      updateModuleReducer({
                        ...module,
                        name: e.target.value,
                      })
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...module, editing: false });
                    }
                  }}
                />
              )}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={onRemoveModule}
                editModule={(id) => dispatch(editModule(id))}
              />
            </div>
            {(module.lessons ?? []).length > 0 ? (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                  </ListGroupItem>
                ))}
              </ListGroup>
            ) : (
              <div className="p-3 text-secondary">
                No lessons in this module.
              </div>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}