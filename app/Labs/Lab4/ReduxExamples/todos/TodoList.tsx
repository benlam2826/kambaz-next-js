import { useState } from "react";
import { ListGroup, ListGroupItem, Button, } from "react-bootstrap";
import TodoForm, { Todo } from "./TodoForm";

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([
        { id: "1", title: "Learn React" },
        { id: "2", title: "Learn Node" },
    ]);
    const [todo, setTodo] = useState<Todo>({ id: "-1", title: "Learn Mongo" });

    const addTodo = (t: Todo) => {
        const newTodos = [...todos, { ...t, id: new Date().getTime().toString() }];
        setTodos(newTodos);
        setTodo({ id: "-1", title: "" });
    };

    const deleteTodo = (id: string) => {
        const newTodos = todos.filter((t) => t.id !== id);
        setTodos(newTodos);
    };

    const updateTodo = (t: Todo) => {
        const newTodos = todos.map((item) => (item.id === t.id ? t : item));
        setTodos(newTodos);
        setTodo({ id: "-1", title: "" });
    };

    return (
        <div>
            <h2>Todo List</h2>
            <ListGroup>
                <TodoForm todo={todo} setTodo={setTodo} addTodo={addTodo} updateTodo={updateTodo} />
                {todos.map((t) => (
                    <ListGroupItem key={t.id}>
                        <Button onClick={() => deleteTodo(t.id)} id="wd-delete-todo-click">
                            Delete
                        </Button>
                        <Button onClick={() => setTodo(t)} id="wd-set-todo-click">
                            Edit
                        </Button>
                        {t.title}
                    </ListGroupItem>
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}