"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import type { RootState } from "../../../store";
import { setAssignments } from "./reducer";
import * as client from "../../../Assignments/client";

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (s: RootState) => s.assignmentsReducer
  );

  useEffect(() => {
    const load = async () => {
      if (!cid) return;
      const data = await client.findAssignmentsForCourse(cid);
      dispatch(setAssignments(data));
    };
    load();
  }, [cid, dispatch]);

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Assignments</h3>
        <Link href={`/Courses/${cid}/Assignments/Editor`} className="btn btn-danger">
          + Assignment
        </Link>
      </div>

      <ListGroup className="mt-3">
        {assignments.map((a) => (
          <ListGroupItem key={a._id} className="d-flex justify-content-between">
            <div>
              <Link href={`/Courses/${cid}/Assignments/Editor?aid=${a._id}`}>
                {a.name || "(Untitled)"}
              </Link>
              <div className="small text-secondary">
                {a.points ?? 0} pts · Due {a.due ? a.due.slice(0, 10) : "—"}
              </div>
            </div>
            <Link
              href={`/Courses/${cid}/Assignments/Editor?aid=${a._id}`}
              className="btn btn-outline-secondary btn-sm">
              Edit
            </Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
