import React from 'react';
import { TodoListProps } from './TodoListProps';
const TodoList = ({ todoList }: TodoListProps) => {
    return (
        <ul>
            {todoList.map(o => <li key={o.id}>{o.title}</li>)}
        </ul>
    )
}

export default TodoList;
