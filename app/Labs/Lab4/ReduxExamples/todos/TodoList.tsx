"use client";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import type { RootState } from "../../store";

type Todo = { id: string; title: string };

export default function TodoList() {
    const todos = useSelector<RootState, Todo[]>(
        (state) => state.todosReducer.todos as Todo[]
    );

    return (
        <div id="wd-todo-list-redux" className="mb-3" style={{ maxWidth: 420 }}>
            <h3>Todo List</h3>
            <ListGroup variant="flush">
                <TodoForm />
                {todos.map((t) => (
                    <TodoItem key={t.id} todo={t} />
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}