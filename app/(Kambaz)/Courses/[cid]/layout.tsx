"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import type { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa6";

export interface CourseLite {
  _id: string;
  name: string;
}

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const { courses } = useSelector((s: RootState) => s.coursesReducer as { courses: CourseLite[] });
  const course = courses.find((c) => c._id === cid);
  const [showNav, setShowNav] = useState(true);

  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          role="button"
          onClick={() => setShowNav((v) => !v)}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        {showNav && (
          <div>
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}