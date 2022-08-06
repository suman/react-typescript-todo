import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';


function TodoContainer() {
  const [todoLists, setTodoLists] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setTodoLists(json));
  }, []);

  const todoConfig = { todoList: todoLists };


  return (
    <TodoList {...todoConfig} />
  )
}

export default TodoContainer;
