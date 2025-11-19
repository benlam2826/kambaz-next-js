"use client";

import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchTodos = async () => {
        try {
            setErrorMessage(null);
            const remoteTodos = await client.fetchTodos();
            setTodos(remoteTodos);
        } catch (error: any) {
            setErrorMessage("Error loading todos");
        }
    };
    const createNewTodo = async () => {
        try {
            setErrorMessage(null);
            const updatedTodos = await client.createNewTodo();
            setTodos(updatedTodos);
        } catch (error: any) {
            setErrorMessage("Unable to create todo (old create)");
        }
    };
    const postNewTodo = async () => {
        try {
            setErrorMessage(null);
            const newTodo = await client.postNewTodo({
                title: "New Posted Todo",
                completed: false,
            });
            setTodos([...todos, newTodo]);
        } catch (error: any) {
            setErrorMessage("Unable to create todo (POST)");
        }
    };
    const removeTodo = async (todo: any) => {
        try {
            setErrorMessage(null);
            const remaining = await client.removeTodo(todo);
            setTodos(remaining);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Delete failed");
        }
    };
    const deleteTodo = async (todo: any) => {
        try {
            setErrorMessage(null);
            await client.deleteTodo(todo);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Delete failed");
        }
    };
    const editTodo = (todo: any) => {
        const updated = todos.map((t) =>
            t.id === todo.id ? { ...todo, editing: true } : t
        );
        setTodos(updated);
    };
    const updateTodo = async (todo: any) => {
        try {
            setErrorMessage(null);
            await client.updateTodo(todo);

            const updated = todos.map((t) =>
                t.id === todo.id ? todo : t
            );
            setTodos(updated);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Update failed");
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div id="wd-asynchronous-arrays">
            <h3>Working with Arrays Asynchronously</h3>
            {errorMessage && (
                <div className="alert alert-danger mb-2 mt-2" id="wd-todo-error-message">
                    {errorMessage}
                </div>
            )}

            <h4>
                Todos
                <FaPlusCircle
                    onClick={createNewTodo}
                    className="text-success float-end fs-3"
                    id="wd-create-todo"
                />
                <FaPlusCircle
                    onClick={postNewTodo}
                    className="text-primary float-end fs-3 me-3"
                    id="wd-post-todo"
                />
            </h4>
            <ListGroup>
                {todos.map((todo) => (
                    <ListGroupItem key={todo.id}>
                        <FaTrash
                            onClick={() => removeTodo(todo)}
                            className="text-danger float-end mt-1"
                            id="wd-remove-todo"
                        />
                        <TiDelete
                            onClick={() => deleteTodo(todo)}
                            className="text-danger float-end me-2 fs-3"
                            id="wd-delete-todo"
                        />
                        <FaPencil
                            onClick={() => editTodo(todo)}
                            className="text-primary float-end me-2 mt-1"
                        />
                        <input
                            type="checkbox"
                            defaultChecked={todo.completed}
                            className="form-check-input me-2 float-start"
                            onChange={(e) =>
                                updateTodo({ ...todo, completed: e.target.checked })
                            }
                        />
                        {!todo.editing ? (
                            <span
                                style={{
                                    textDecoration: todo.completed ? "line-through" : "none",
                                }}
                            >
                                {todo.title}
                            </span>
                        ) : (
                            <FormControl
                                className="w-50 float-start"
                                defaultValue={todo.title}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateTodo({ ...todo, editing: false });
                                    }
                                }}
                                onChange={(e) =>
                                    updateTodo({ ...todo, title: e.target.value })
                                }
                            />
                        )}
                    </ListGroupItem>
                ))}
            </ListGroup>

            <hr />
        </div>
    );
}
