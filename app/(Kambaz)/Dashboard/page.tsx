"use client";
import { useState } from "react";
import Link from "next/link";
import { Row, Col, Card, Button, CardImg, CardBody, CardTitle, CardText, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/[cid]/reducer";
import type { RootState } from "../store";
import type { Course } from "../Courses/[cid]/reducer";
import { v4 as uuidv4 } from "uuid";

type CourseDraft = Pick<Course, "_id" | "name" | "number" | "startDate" | "endDate" | "description" | "image">;

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<CourseDraft>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const imageById: Record<string, string> = {
    CS1234: "/images/reactjs.png",
    CS3000: "/images/algorithms.jpg",
    CS3450: "/images/cpluspluslogo.png",
    CS1500: "/images/fundies.jpg",
    CS1700: "/images/javalogo.jpg",
    CS1600: "/images/pythonlogo.png",
    CS4550: "/images/webdev.jpg",
  };
  const fallback = "/images/reactjs.png";

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h5 className="mb-2">
        New Course
        <Button
          className="float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse({ ...course, _id: uuidv4() }))}
        >
          Add
        </Button>
        <Button
          variant="warning"
          className="float-end me-2"
          id="wd-update-course-click"
          onClick={() => dispatch(updateCourse(course as Course))}
        >
          Update
        </Button>
      </h5>

      <div className="mb-3" id="wd-dashboard-course-form">
        <FormControl
          value={course.name}
          className="mb-2"
          placeholder="Course name"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <FormControl
          as="textarea"
          rows={3}
          value={course.description}
          placeholder="Course description"
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
      </div>

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {courses.map((c) => (
          <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <CardImg
                variant="top"
                src={imageById[c._id] ?? fallback}
                width="100%"
                height={160}
                alt={c.name}
                style={{ objectFit: "cover" }}
              />
              <CardBody>
                <CardTitle className="text-nowrap overflow-hidden">{c.name}</CardTitle>
                <CardText className="overflow-hidden" style={{ height: "100px" }}>
                  {c.description}
                </CardText>
              </CardBody>
              <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center px-3 pb-3">
                <Link href={`/Courses/${c._id}/Home`} className="btn btn-primary">Go</Link>
                <div className="d-flex gap-2">
                  <Button
                    id="wd-edit-course-click"
                    variant="warning"
                    onClick={(e) => {
                      e.preventDefault();
                      setCourse(c);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    id="wd-delete-course-click"
                    variant="danger"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteCourse(c._id));
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}