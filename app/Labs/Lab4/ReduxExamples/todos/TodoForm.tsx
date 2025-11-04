import { Button, FormControl, ListGroupItem } from "react-bootstrap";

export interface Todo {
    id: string;
    title: string;
}

interface Props {
    todo: Todo;
    setTodo: (t: Todo) => void;
    addTodo: (t: Todo) => void;
    updateTodo: (t: Todo) => void;
}

export default function TodoForm({ todo, setTodo, addTodo, updateTodo }: Props) {
    return (
        <ListGroupItem>
            <Button onClick={() => addTodo(todo)} id="wd-add-todo-click">
                Add
            </Button>
            <Button onClick={() => updateTodo(todo)} id="wd-update-todo-click">
                Update
            </Button>
            <FormControl
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
        </ListGroupItem>
    );
}