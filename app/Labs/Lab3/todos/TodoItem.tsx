"use client";
import { ListGroupItem } from "react-bootstrap";

export type Todo = {
    title: string;
    status: "COMPLETED" | "CANCELED" | "IN PROGRESS" | "DEFERRED" | string;
    done: boolean;
};



const TodoItem = ({ todo = {
    done: true, title: 'Buy milk',
    status: 'COMPLETED'
}, }: { todo: Todo }) => {
    return (
        <ListGroupItem as="li" className="d-flex align-items-center">
            <input
                type="checkbox"
                className="me-2"
                defaultChecked={todo.done}
                aria-label={`Mark "${todo.title}" as done`}
            />
            {todo.title} ({todo.status})
        </ListGroupItem>
    );
};

export default TodoItem;