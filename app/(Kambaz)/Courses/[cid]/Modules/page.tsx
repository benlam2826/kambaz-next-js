"use client";

import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import type { Module as ModuleType, Lesson } from "../../../Database/types";

function ModuleControlButtons() { return null; }
function LessonControlButtons() { return null; }

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const modules = (db.modules as ModuleType[]).filter((m) => m.course === cid);

  return (
    <div id="wd-modules-page" className="container">
      <h3>Modules</h3>

      {modules.length === 0 && (
        <p className="text-secondary">No modules for this course yet.</p>
      )}

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module) => (
          <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <span className="me-auto">{module.name}</span>
              <ModuleControlButtons />
            </div>

            {(module.lessons ?? []).length > 0 ? (
              <ListGroup className="wd-lessons rounded-0">
                {(module.lessons as Lesson[]).map((lesson) => (
                  <ListGroupItem key={lesson._id ?? lesson.name} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
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