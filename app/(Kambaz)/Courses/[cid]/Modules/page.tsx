"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store";
import { Module } from "./reducer";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState<string>("");
  const { modules } = useSelector((s: RootState) => s.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-modules-page" className="container">
      <h3>Modules</h3>

      <div className="mb-3">
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={() => {
            if (!moduleName.trim()) return;
            dispatch(addModule({ name: moduleName, course: cid }));
            setModuleName("");
          }}
        />
      </div>

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((m: Module) => m.course === cid)
          .map((module: Module) => (
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && <span className="me-auto">{module.name}</span>}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block me-auto"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(id) => dispatch(deleteModule(id))}
                  editModule={(id) => dispatch(editModule(id))}
                />
              </div>

              {(module.lessons ?? []).length > 0 ? (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson) => (
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              ) : (
                <div className="p-3 text-secondary">No lessons in this module.</div>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}