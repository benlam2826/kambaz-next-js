"use client";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();

    return (
        <ListGroupItem className="d-flex align-items-center gap-2">
            <FormControl
                placeholder="Learn Mongo"
                value={todo.title}
                onChange={(e) =>
                    dispatch(setTodo({ ...(todo.id ? { id: todo.id } : {}), title: e.target.value }))
                }
                className="flex-grow-1"
            />
            <Button
                onClick={() => todo?.id && dispatch(updateTodo({ id: todo.id, title: todo.title || "" }))}
                id="wd-update-todo-click"
                className="btn btn-warning btn-sm rounded-2 px-2"
            >
                Update
            </Button>
            <Button
                onClick={() => dispatch(addTodo({ title: todo.title || "" }))}
                id="wd-add-todo-click"
                className="btn btn-success btn-sm rounded-2 px-2"
            >
                Add
            </Button>
        </ListGroupItem>
    );
}
