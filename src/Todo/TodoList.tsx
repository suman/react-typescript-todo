import React, { useEffect, useState } from 'react';
import { TodoListProps } from './TodoListProps';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import api from './TodoSdk';
import getTodoList from './Util';

const TodoList = ({ todoList }: TodoListProps) => {
    const [finalTodoList, setFinalTodoList] = useState<any>([]);
    useEffect(() => {
        setFinalTodoList(todoList);
    }, [todoList])

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const handleTaskDone = (taskId: string, isComplete: boolean) => {
        if (isComplete) {
            api.closeTask(taskId)
                .then(() => {
                    getTodoList().then(tasks => {
                        setFinalTodoList(tasks);
                    });
                }).catch((error) => console.log(error))
        }

    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Task name</TableCell>
                        <TableCell align="right">Create Date</TableCell>
                        <TableCell align="right">Mark as done</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {finalTodoList.map((row: any) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.content}
                            </TableCell>
                            <TableCell align="right">{row.createdAt}</TableCell>
                            {row.isCompleted ? <Switch {...label} defaultChecked /> :
                                <Switch {...label} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleTaskDone(`${row.id}`, event.target.checked)
                                }}
                                />}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TodoList;
