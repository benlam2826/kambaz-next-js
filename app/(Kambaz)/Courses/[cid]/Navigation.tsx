"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const LINKS = [
  "Home",
  "Modules",
  "Piazza",
  "Zoom",
  "Assignments",
  "Quizzes",
  "Grades",
  "People",
];

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const pathname = usePathname();

  const hrefFor = (label: string) =>
    label === "People" ? `/Courses/${cid}/People/Table` : `/Courses/${cid}/${label}`;

  const isActive = (label: string) => {
    if (label === "People") return pathname.includes(`/Courses/${cid}/People`);
    return pathname.endsWith(`/${label}`);
  };

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {LINKS.map((label) => (
        <Link
          key={label}
          href={hrefFor(label)}
          id={`wd-course-${label.toLowerCase()}-link`}
          className={`list-group-item border-0 ${isActive(label) ? "active" : "text-danger"}`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}