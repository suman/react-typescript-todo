export interface TodoListProps {
    todoList: Todo[];
}

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: false;
}