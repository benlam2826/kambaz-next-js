"use client";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
    course,
}: {
    course: { name: string } | undefined;
}) {
    const pathname = usePathname();
    const parts = pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    const prev = parts[parts.length - 2];

    const friendlyTail =
        last === "Table" && prev === "People" ? "People" : decodeURIComponent(last || "");

    return (
        <span id="wd-breadcrumb" className="text-secondary">
            Course {course?.name} &gt; {friendlyTail}
        </span>
    );
}
