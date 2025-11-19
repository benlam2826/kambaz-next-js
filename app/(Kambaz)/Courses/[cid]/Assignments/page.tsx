"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import type { RootState } from "../../../store";
import { setAssignments } from "./reducer";
import * as client from "../../../Assignments/client";

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
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (s: RootState) => s.assignmentsReducer as { assignments: Assignment[] }
  );

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!cid) return;
      try {
        const data = await client.findAssignmentsForCourse(cid);
        dispatch(setAssignments(data));
      } catch (e) {
        console.error("Error fetching assignments", e);
      }
    };
    fetchAssignments();
  }, [cid, dispatch]);

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