"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Row,
  Col,
  Form,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
} from "react-bootstrap";
import * as db from "../../../../Database";
import type { Assignment } from "../../../../Database/types";

export default function AssignmentEditor() {
  // Get course id and assignment id from the URL
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  // Look up the assignment from the database
  const assignment = (db.assignments as Assignment[]).find((a) => a._id === aid);

  if (!assignment) {
    return (
      <div className="container pt-2">
        <h3>Assignment not found</h3>
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary mt-2">
          Back to Assignments
        </Link>
      </div>
    );
  }

  const {
    title = "",
    description = "",
    points = 0,
    due = "",
    available = "",
  } = assignment;

  return (
    <div id="wd-assignment-editor" className="pt-2 container">
      <h2 className="mb-3">Edit Assignment</h2>

      <Form>
        {/* Assignment Name */}
        <FormLabel htmlFor="wd-assignment-name" className="fw-semibold">
          Assignment Name
        </FormLabel>
        <FormControl
          id="wd-assignment-name"
          className="mb-3"
          defaultValue={title}
          placeholder="Enter assignment name"
        />

        {/* Description */}
        <FormLabel htmlFor="wd-assignment-description" className="fw-semibold">
          Description
        </FormLabel>
        <FormControl
          as="textarea"
          id="wd-assignment-description"
          className="mb-4"
          rows={8}
          defaultValue={description}
        />

        <Row className="g-4">
          {/* Left column */}
          <Col md={6}>
            <FormLabel htmlFor="wd-points" className="fw-semibold">
              Points
            </FormLabel>
            <FormControl
              id="wd-points"
              type="number"
              className="mb-3"
              defaultValue={points}
              min={0}
            />

            {/* Assignment Group */}
            <FormLabel htmlFor="wd-assignment-group" className="fw-semibold">
              Assignment Group
            </FormLabel>
            <FormSelect id="wd-assignment-group" className="mb-3" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </FormSelect>

            {/* Display Grade As */}
            <FormLabel htmlFor="wd-display-grade-as" className="fw-semibold">
              Display Grade as
            </FormLabel>
            <FormSelect id="wd-display-grade-as" className="mb-3" defaultValue="POINTS">
              <option value="POINTS">Points</option>
              <option value="PERCENTAGE">Percentage</option>
              <option value="LETTER_GRADE">Letter Grade</option>
              <option value="COMPLETE_INCOMPLETE">Complete/Incomplete</option>
            </FormSelect>

            {/* Submission Type */}
            <FormLabel htmlFor="wd-submission-type" className="fw-semibold">
              Submission Type
            </FormLabel>
            <FormSelect id="wd-submission-type" className="mb-3" defaultValue="ONLINE">
              <option value="ONLINE">Online</option>
              <option value="ONPAPER">On Paper</option>
              <option value="NO_SUBMISSION">No Submission</option>
            </FormSelect>

            {/* Online Entry Options */}
            <FormLabel className="fw-semibold">Online Entry Options</FormLabel>
            <div className="mb-3">
              <FormCheck id="wd-text-entry" label="Text Entry" />
              <FormCheck id="wd-website-url" label="Website URL" />
              <FormCheck id="wd-media-recordings" label="Media Recordings" />
              <FormCheck id="wd-student-annotation" label="Student Annotation" />
              <FormCheck id="wd-file-upload" label="File Uploads" />
            </div>
          </Col>

          {/* Right column */}
          <Col md={6}>
            <div id="wd-assign" className="border rounded p-3">
              <h5 className="mb-3">Assign</h5>

              <FormLabel htmlFor="wd-assign-to" className="fw-semibold">
                Assign to
              </FormLabel>
              <FormControl id="wd-assign-to" className="mb-3" defaultValue="Everyone" />

              <FormLabel htmlFor="wd-available-from" className="fw-semibold">
                Available from
              </FormLabel>
              <FormControl
                id="wd-available-from"
                type="date"
                className="mb-3"
                defaultValue={available}
              />

              <FormLabel htmlFor="wd-due-date" className="fw-semibold">
                Due
              </FormLabel>
              <FormControl id="wd-due-date" type="date" className="mb-3" defaultValue={due} />

              <FormLabel htmlFor="wd-available-until" className="fw-semibold">
                Until
              </FormLabel>
              <FormControl id="wd-available-until" type="date" className="mb-1" />

              <div className="text-muted small">
                Calendar icons aren’t required; date format can vary (e.g., YYYY-MM-DD).
              </div>
            </div>
          </Col>
        </Row>

        {/* Actions */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary" id="wd-cancel">
            Cancel
          </Link>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-primary" id="wd-save">
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}