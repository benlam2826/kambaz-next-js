"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import type { RootState } from "../../../store";

export interface Assignment {
  _id: string;
  course: string;
  name: string;
  description: string;
  points: number;
  due?: string;
  availableFrom?: string;
  availableUntil?: string;
}

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>();
  const { assignments } = useSelector(
    (s: RootState) => s.assignmentsReducer as { assignments: Assignment[] }
  );

  const courseAssignments = assignments.filter((a) => a.course === cid);

  return (
    <div className="p-3" id="wd-assignments-page">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Assignments</h3>
        <Link href={`/Courses/${cid}/Assignments/Editor`} className="btn btn-danger">
          + Assignment
        </Link>
      </div>

      <ListGroup className="mt-3">
        {courseAssignments.map((a) => (
          <ListGroupItem key={a._id} className="d-flex justify-content-between">
            <div>
              <Link href={`/Courses/${cid}/Assignments/Editor?aid=${a._id}`}>
                {a.name}
              </Link>
              <div className="small text-secondary">
                {a.points} pts · Due {a.due || "—"}
              </div>
            </div>
            <Link
              className="btn btn-outline-secondary btn-sm"
              href={`/Courses/${cid}/Assignments/Editor?aid=${a._id}`}
            >
              Edit
            </Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
