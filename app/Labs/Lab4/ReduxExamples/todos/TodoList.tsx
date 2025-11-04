"use client";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer);

    return (
        <div id="wd-todo-list-redux" className="mb-3" style={{ maxWidth: 420 }}>
            <h3>Todo List</h3>
            <ListGroup variant="flush">
                <TodoForm />
                {todos.map((t: any) => (
                    <TodoItem key={t.id} todo={t} />
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}
