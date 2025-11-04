"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((c: any) => c._id === cid);

  const [showNav, setShowNav] = useState(true);

  return (
    <div id="wd-courses" className="p-3">
      <h2 className="d-flex align-items-center">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          role="button"
          aria-label="Toggle course navigation"
          tabIndex={0}
          onClick={() => setShowNav((s) => !s)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setShowNav((s) => !s)}
          title={showNav ? "Hide navigation" : "Show navigation"}
        />
        {course?.name ?? "Course"}
      </h2>
      <hr />
      <div className="d-flex">
        {showNav && (
          <div className="me-3">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}