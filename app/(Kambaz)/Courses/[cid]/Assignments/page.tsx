"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { useParams, useRouter } from "next/navigation";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "../Assignments/reducer";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (s: RootState) => s.assignmentsReducer
  );

  const courseAssignments = assignments.filter((a: any) => a.course === cid);

  return (
    <div className="p-3" id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Assignments</h3>
        <Button
          variant="danger"
          onClick={() => router.push(`/Courses/${cid}/Assignments/Editor`)}
        >
          + Assignment
        </Button>
      </div>
      <ListGroup className="mt-3">
        {courseAssignments.map((a: any) => (
          <ListGroupItem
            key={a._id}
            className="d-flex align-items-center justify-content-between"
          >
            <Link
              href={`/Courses/${cid}/Assignments/Editor?aid=${a._id}`}
              className="text-decoration-none"
            >
              <strong>{a.name}</strong> · {a.points} pts · Due {a.due || "—"}
            </Link>
            <FaTrash
              className="text-danger"
              role="button"
              onClick={() => {
                if (confirm("Delete this assignment?")) {
                  dispatch(deleteAssignment(a._id));
                }
              }}
            />
          </ListGroupItem>
        ))}
        {courseAssignments.length === 0 && (
          <ListGroupItem className="text-secondary">
            No assignments yet.
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
}