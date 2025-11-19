// app/Labs/Lab5/WorkingWithArrays.tsx

"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const API = `${HTTP_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
    const [todo, setTodo] = useState({
        id: "1",
        description: "New description",
        completed: false,
    });

    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
                Get Todos
            </a>
            <hr />
            <h4>Retrieving an Item from an Array by ID</h4>
            <a
                id="wd-retrieve-todo-by-id"
                className="btn btn-primary float-end"
                href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>
            <FormControl
                id="wd-todo-id"
                defaultValue={todo.id}
                className="w-50"
                onChange={(e) =>
                    setTodo({ ...todo, id: e.target.value })
                }
            />
            <br />
            <br />
            <hr />
            <h4>Filtering Array Items</h4>
            <a
                id="wd-retrieve-completed-todos"
                className="btn btn-primary"
                href={`${API}?completed=true`}>
                Get Completed Todos
            </a>
            <hr />
            <h4>Creating new Items in an Array</h4>
            <a
                id="wd-create-todo"
                className="btn btn-primary"
                href={`${API}/create`}>
                Create Todo
            </a>
            <hr />
            <h4>Removing from an Array</h4>
            <a
                id="wd-remove-todo"
                className="btn btn-primary float-end"
                href={`${API}/${todo.id}/delete`}>
                Remove Todo with ID = {todo.id}
            </a>
            <FormControl
                defaultValue={todo.id}
                className="w-50"
                onChange={(e) =>
                    setTodo({ ...todo, id: e.target.value })
                }
            />
            <br />
            <br />
            <hr />
            <h4>Updating Description & Completed (On Your Own)</h4>
            <a
                id="wd-update-todo-description"
                className="btn btn-secondary float-end mb-2"
                href={`${API}/${todo.id}/description/${todo.description}`}
            >
                Describe Todo ID = {todo.id}
            </a>
            <FormControl
                id="wd-todo-description"
                className="w-75 mb-2"
                defaultValue={todo.description}
                onChange={(e) =>
                    setTodo({ ...todo, description: e.target.value })
                }
            />
            <a
                id="wd-update-todo-completed"
                className="btn btn-secondary float-end mb-2"
                href={`${API}/${todo.id}/completed/${todo.completed}`}>
                Complete Todo ID = {todo.id}
            </a>
            <div className="form-check mb-2">
                <input
                    id="wd-todo-completed"
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={todo.completed}
                    onChange={(e) =>
                        setTodo({ ...todo, completed: e.target.checked })
                    }
                />
                <label className="form-check-label" htmlFor="wd-todo-completed">
                    Completed
                </label>
            </div>

            <hr />
        </div>
    );
}
