"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../Database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import type { Assignment } from "../../../Database/types";

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>();
  const items = (db.assignments as Assignment[]).filter(a => a.course === cid);

  return (
    <div id="wd-assignments" className="container">
      <h3>Assignments</h3>
      {items.length === 0 && <p className="text-secondary">No assignments for this course.</p>}
      <ListGroup>
        {items.map(a => (
          <ListGroupItem key={a._id} as={Link}
                         href={`/Courses/${cid}/Assignments/${a._id}`}
                         className="d-flex justify-content-between align-items-center">
            <span className="fw-semibold">{a.title}</span>
            <span className="text-secondary small">
              {a.points} pts &nbsp;|&nbsp; Due {a.due}
            </span>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}