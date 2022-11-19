export interface TodoListProps {
    todoList: Todo[];
}

export interface Todo {
    userId: number;
    id: number;
    content: string;
    createdAt: string;
    isCompleted: boolean;
}