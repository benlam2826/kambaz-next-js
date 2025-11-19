// app/Labs/Lab5/WorkingWithObjects.tsx

"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });

    const [moduleObj, setModuleObj] = useState({
        id: "M101",
        name: "Intro to Node",
        description: "Basics of Node.js and Express.js",
        course: "CS4550",
    });

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Retrieving Objects</h4>
            <a
                id="wd-retrieve-assignments"
                className="btn btn-primary me-2"
                href={`${ASSIGNMENT_API_URL}`}
            >
                Get Assignment
            </a>
            <hr />
            <h4>Retrieving Properties</h4>
            <a
                id="wd-retrieve-assignment-title"
                className="btn btn-primary me-2"
                href={`${ASSIGNMENT_API_URL}/title`}
            >
                Get Title
            </a>
            <hr />
            <h4>Modifying Assignment Properties</h4>
            <a
                id="wd-update-assignment-title"
                className="btn btn-primary float-end mb-2"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
            >
                Update Title
            </a>
            <FormControl
                className="w-75 mb-2"
                id="wd-assignment-title"
                defaultValue={assignment.title}
                onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })
                }
            />
            <a
                id="wd-update-assignment-score"
                className="btn btn-secondary float-end mb-2"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <FormControl
                className="w-25 mb-2"
                id="wd-assignment-score"
                type="number"
                defaultValue={assignment.score}
                onChange={(e) =>
                    setAssignment({
                        ...assignment,
                        score: parseInt(e.target.value || "0"),
                    })
                }
            />
            <a
                id="wd-update-assignment-completed"
                className="btn btn-secondary float-end mb-2 ms-2"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                Update Completed
            </a>
            <div className="form-check mb-2">
                <input
                    id="wd-assignment-completed"
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={assignment.completed}
                    onChange={(e) =>
                        setAssignment({
                            ...assignment,
                            completed: e.target.checked,
                        })
                    }
                />
                <label
                    className="form-check-label"
                    htmlFor="wd-assignment-completed">
                    Completed
                </label>
            </div>
            <hr />
            <h4>Module Object</h4>
            <a
                id="wd-get-module"
                className="btn btn-primary me-2"
                href={`${MODULE_API_URL}`}>
                Get Module
            </a>
            <a
                id="wd-get-module-name"
                className="btn btn-primary"
                href={`${MODULE_API_URL}/name`}>
                Get Module Name
            </a>
            <hr />
            <h5>Update Module Name</h5>
            <a
                id="wd-update-module-name"
                className="btn btn-secondary float-end mb-2"
                href={`${MODULE_API_URL}/name/${moduleObj.name}`}>
                Update Name
            </a>
            <FormControl
                id="wd-module-name"
                className="w-75 mb-2"
                defaultValue={moduleObj.name}
                onChange={(e) =>
                    setModuleObj({ ...moduleObj, name: e.target.value })
                }
            />
            <h5>Update Module Description</h5>
            <a
                id="wd-update-module-description"
                className="btn btn-secondary float-end mb-2"
                href={`${MODULE_API_URL}/description/${moduleObj.description}`}>
                Update Description
            </a>
            <FormControl
                as="textarea"
                rows={3}
                id="wd-module-description"
                className="w-75 mb-2"
                defaultValue={moduleObj.description}
                onChange={(e) =>
                    setModuleObj({
                        ...moduleObj,
                        description: e.target.value,
                    })
                }
            />
            <hr />
        </div>
    );
}
