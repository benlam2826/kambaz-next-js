"use client";

import Link from "next/link";
import { Row, Col, Form, FormLabel, FormControl, FormSelect, FormCheck, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignment-editor" className="pt-2">
      <h2 className="mb-3">Edit Assignment</h2>

      <Form>
        {/* Assignment Name */}
        <FormLabel htmlFor="wd-assignment-name" className="fw-semibold">
          Assignment Name
        </FormLabel>
        <FormControl
          id="wd-assignment-name"
          className="mb-3"
          defaultValue="A1 - ENV + HTML"
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
          defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include: Your full name, Section, Links to each of the lab assignments, Link to the Kambaz application, Links to all relevant source code repositories. The Kambaz application should include a link to navigate back to the landing page.`}
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
              defaultValue={100}
              min={0}
            />

            {/* Assignment Group */}
            <FormLabel htmlFor="wd-assignment-group" className="fw-semibold">
              Assignment Group
            </FormLabel>
            <FormSelect
              id="wd-assignment-group"
              className="mb-3"
              defaultValue="ASSIGNMENTS"
            >
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </FormSelect>

            {/* Display Grade As */}
            <FormLabel htmlFor="wd-display-grade-as" className="fw-semibold">
              Display Grade as
            </FormLabel>
            <FormSelect
              id="wd-display-grade-as"
              className="mb-3"
              defaultValue="POINTS"
            >
              <option value="POINTS">Points</option>
              <option value="PERCENTAGE">Percentage</option>
              <option value="LETTER_GRADE">Letter Grade</option>
              <option value="COMPLETE_INCOMPLETE">Complete/Incomplete</option>
            </FormSelect>

            {/* Submission Type */}
            <FormLabel htmlFor="wd-submission-type" className="fw-semibold">
              Submission Type
            </FormLabel>
            <FormSelect
              id="wd-submission-type"
              className="mb-3"
              defaultValue="ONLINE"
            >
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

          {/* Right column*/}
          <Col md={6}>
            <div id="wd-assign" className="border rounded p-3">
              <h5 className="mb-3">Assign</h5>

              <FormLabel htmlFor="wd-assign-to" className="fw-semibold">
                Assign to
              </FormLabel>
              <FormControl
                id="wd-assign-to"
                className="mb-3"
                defaultValue="Everyone"
              />

              {/* Dates */}
              <FormLabel htmlFor="wd-due-date" className="fw-semibold">
                Due
              </FormLabel>
              <FormControl
                id="wd-due-date"
                type="datetime-local"
                className="mb-3"
              />

              <FormLabel htmlFor="wd-available-from" className="fw-semibold">
                Available from
              </FormLabel>
              <FormControl
                id="wd-available-from"
                type="datetime-local"
                className="mb-3"
              />

              <FormLabel htmlFor="wd-available-until" className="fw-semibold">
                Until
              </FormLabel>
              <FormControl
                id="wd-available-until"
                type="datetime-local"
                className="mb-1"
              />

              <div className="text-muted small">
                Calendar icons aren’t required; date format can vary (e.g., MM/DD/YYYY).
              </div>
            </div>
          </Col>
        </Row>

        {/* Actions */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Link href="../" className="btn btn-secondary" id="wd-cancel">
            Cancel
          </Link>
          <Button id="wd-save" variant="primary">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}