import React, { useState, useEffect } from 'react';
import CreateTask from './CreateTask';
import TodoList from './TodoList';
import getTodoList from './Util';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

function MainCont() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [todoLists, setTodoLists] = useState([]);



  useEffect(() => {
    getTodoList().then(tasks => setTodoLists(tasks));
  }, []);

  const todoConfig = { todoList: todoLists };

  // parameter task:any should be changed into correct format
  const saveTaskCallback = (task: any) => {
    if (task) getTodoList().then(tasks => setTodoLists(tasks));;
  }

  const handleTaskModal = () => {
    setModalOpen(true)
  }

  const handleTaskModalClose = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Box textAlign='right'>
        <Button variant='contained' onClick={handleTaskModal} >
          Create Task
        </Button>
      </Box>

      <CreateTask openModal={modalOpen} saveTaskCallback={saveTaskCallback} handleTaskModalClose={handleTaskModalClose} />
      <TodoList {...todoConfig} />
    </>
  )
}

export default MainCont;
