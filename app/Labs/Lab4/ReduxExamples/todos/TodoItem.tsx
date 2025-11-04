"use client";
import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
    const dispatch = useDispatch();

    return (
        <ListGroupItem className="d-flex align-items-center justify-content-between">
            <span>{todo.title}</span>
            <div className="d-flex gap-2">
                <Button
                    onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click"
                    className="btn btn-primary btn-sm rounded-2 px-2"
                >
                    Edit
                </Button>
                <Button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click"
                    className="btn btn-danger btn-sm rounded-2 px-2"
                >
                    Delete
                </Button>
            </div>
        </ListGroupItem>
    );
}
