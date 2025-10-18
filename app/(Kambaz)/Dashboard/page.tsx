// app/(Kambaz)/Dashboard/page.tsx
import Link from "next/link";
import * as db from "../Database";
import {
  Row, Col, Card, Button, CardImg, CardBody, CardTitle, CardText
} from "react-bootstrap";

export default function Dashboard() {
  const courses = db.courses;

  // Mapping course IDs to files you already have in /public/images
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
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={imageById[course._id] ?? fallback}
                    width="100%"
                    height={160}
                    alt={course.name}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}