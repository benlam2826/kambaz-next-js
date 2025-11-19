"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

import type { RootState } from "../store";
import {
    setEnrollments,
    toggleShowAll,
    enroll,
    unenroll,
} from "./reducer";

import * as enrollmentsClient from "./client";
import * as coursesClient from "../Courses/client";

interface Course {
    _id: string;
    name: string;
    description?: string;
}

export default function EnrollmentsPage() {
    const dispatch = useDispatch();
    const { enrollments, showAll } = useSelector(
        (s: RootState) => s.enrollmentsReducer
    );
    const { currentUser } = useSelector(
        (s: RootState) => s.accountReducer
    );

    const [courses, setCourses] = useState<Course[]>([]);

    const isEnrolled = (courseId: string) =>
        !!currentUser &&
        enrollments.some(
            (e) => e.course === courseId && e.user === currentUser._id
        );

    useEffect(() => {
        const load = async () => {
            try {
                const [allCourses, myEnrollments] = await Promise.all([
                    coursesClient.fetchAllCourses(),
                    enrollmentsClient.fetchMyEnrollments(),
                ]);

                setCourses(allCourses);
                dispatch(
                    setEnrollments(
                        myEnrollments.map((e: any) => ({
                            _id: e._id,
                            user: e.user,
                            course: e.course,
                        }))
                    )
                );
            } catch (err) {
                console.error("Error loading enrollments:", err);
            }
        };
        load();
    }, [dispatch]);

    const handleToggle = () => {
        dispatch(toggleShowAll());
    };

    const handleEnrollClick = async (courseId: string) => {
        if (!currentUser) return;
        if (isEnrolled(courseId)) {
            await enrollmentsClient.unenrollFromCourse(courseId);
            dispatch(unenroll({ user: currentUser._id, course: courseId }));
        } else {
            await enrollmentsClient.enrollInCourse(courseId);
            dispatch(enroll({ user: currentUser._id, course: courseId }));
        }
    };

    const visibleCourses = showAll
        ? courses
        : courses.filter((c) => isEnrolled(c._id));

    return (
        <div id="wd-enrollments-page" className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Enrollments</h3>
                <Button variant="secondary" onClick={handleToggle}>
                    {showAll ? "Show My Courses" : "Show All Courses"}
                </Button>
            </div>
            <ListGroup>
                {visibleCourses.map((course) => {
                    const enrolled = isEnrolled(course._id);
                    return (
                        <ListGroupItem
                            key={course._id}
                            className="d-flex justify-content-between align-items-center">
                            <div>
                                <div className="fw-bold">{course.name}</div>
                                <div className="small text-secondary">
                                    {course.description ?? ""}
                                </div>
                            </div>
                            <Button
                                variant={enrolled ? "outline-danger" : "primary"}
                                onClick={() => handleEnrollClick(course._id)}>
                                {enrolled ? "Unenroll" : "Enroll"}
                            </Button>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        </div>
    );
}