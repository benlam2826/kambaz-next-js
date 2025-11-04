"use client";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import type { RootState } from "../../store";

type Todo = { id: string; title: string };
type TodoDraft = { id?: string; title: string };

export default function TodoForm() {
    const todo = useSelector<RootState, TodoDraft>(
        (state) => state.todosReducer.todo as TodoDraft
    );
    const dispatch = useDispatch();
    const title = todo.title ?? "";

    return (
        <ListGroupItem className="d-flex align-items-center gap-2">
            <FormControl
                placeholder="Learn Mongo"
                value={title}
                onChange={(e) => {
                    const next: TodoDraft = {
                        ...(todo.id ? { id: todo.id } : {}),
                        title: e.target.value,
                    };
                    dispatch(setTodo(next));
                }}
                className="flex-grow-1"
            />
            <Button
                onClick={() => {
                    if (!todo.id) return;
                    const payload: Todo = { id: todo.id, title: title.trim() };
                    dispatch(updateTodo(payload));
                }}
                id="wd-update-todo-click"
                className="btn btn-warning btn-sm rounded-2 px-2"
                disabled={!todo.id || title.trim().length === 0}
            >
                Update
            </Button>
            <Button
                onClick={() => {
                    const trimmed = title.trim();
                    if (trimmed.length === 0) return;
                    dispatch(addTodo({ title: trimmed }));
                }}
                id="wd-add-todo-click"
                className="btn btn-success btn-sm rounded-2 px-2"
                disabled={title.trim().length === 0}
            >
                Add
            </Button>
        </ListGroupItem>
    );
}