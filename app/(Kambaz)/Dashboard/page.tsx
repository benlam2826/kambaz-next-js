"use client";
import { useState } from "react";
import Link from "next/link";
import * as db from "../Database";
import {
  Row, Col, Card, Button, CardImg, CardBody, CardTitle, CardText
} from "react-bootstrap";
import type { Course } from "../Database/types";
import { FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/[cid]/reducer";
import { RootState } from "../store";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [course, setCourse] = useState<any>({
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

  const { enrollments } = db;
  const visibleCourses =
    currentUser
      ? courses.filter((c: any) =>
        enrollments.some(
          (e: any) => e.user === currentUser._id && e.course === c._id
        )
      )
      : [];
  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5 className="mb-2">New Course</h5>
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
      <div className="d-flex gap-2 mb-3">
        <Button
          className="btn btn-primary"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </Button>
        <Button
          variant="warning"
          className="btn"
          id="wd-update-course-click"
          onClick={() => dispatch(updateCourse(course))}
        >
          Update
        </Button>
      </div>
      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />

      {!currentUser && (
        <p className="text-secondary">
          Please sign in to view your enrolled courses.
        </p>
      )}
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c: Course) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card className="h-100">
                <CardImg
                  variant="top"
                  src={imageById[c._id] ?? fallback}
                  width="100%"
                  height={160}
                  alt={c.name}
                  style={{ objectFit: "cover" }}
                />
                <CardBody className="card-body">
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {c.name}
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {c.description}
                  </CardText>
                </CardBody>
                <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center px-3 pb-3">
                  <Link href={`/Courses/${c._id}/Home`} className="btn btn-primary">
                    Go
                  </Link>
                  <div className="d-flex gap-2">
                    <Button
                      id="wd-edit-course-click"
                      variant="warning"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(c);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      id="wd-delete-course-click"
                      variant="danger"
                      onClick={(event) => {
                        event.preventDefault();
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
    </div>
  );
}