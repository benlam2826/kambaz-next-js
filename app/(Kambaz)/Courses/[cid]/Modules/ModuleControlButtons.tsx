"use client";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  return (
    <div className="float-end">
      <FaPencil
        className="text-primary me-3"
        role="button"
        title="Edit module name"
        tabIndex={0}
        onClick={() => editModule(moduleId)}
        onKeyDown={(e) => e.key === "Enter" && editModule(moduleId)}
      />
      <FaTrash
        className="text-danger me-3"
        role="button"
        title="Delete module"
        tabIndex={0}
        onClick={() => deleteModule(moduleId)}
        onKeyDown={(e) => e.key === "Enter" && deleteModule(moduleId)}
      />
      <span className="me-3">
        <GreenCheckmark />
      </span>
      <BsPlus className="fs-1 me-2" title="Add item" />
      <IoEllipsisVertical className="fs-4" title="More options" />
    </div>
  );
}