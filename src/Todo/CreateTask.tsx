import React from 'react';

import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import api from './TodoSdk';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface priorityStatus {
    label: string;
    status: number;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -40%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CreateTask = (props: { saveTaskCallback: any, openModal: boolean, handleTaskModalClose: any }) => {
    const priorities = [
        { label: 'Low', status: 2 },
        { label: 'Medium', status: 4 },
        { label: 'High', status: 8 },
    ];

    const [taskName, setTaskName] = React.useState('');

    const [priority, setPriority] = React.useState<priorityStatus>(priorities[0]);
    const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value);
    }

    const saveTask = () => {
        interface sendDataType {
            content: string;
            [key: string]: any;
        }

        const tobesendData: sendDataType = { content: taskName };
        tobesendData.priority = priority.status;
        let allDataCollected = true;
        if (taskName !== "") {
            tobesendData.content = taskName;
        } else {
            allDataCollected = false;
        }

        if (!allDataCollected) {
            alert("Missing information")
            return;
        }

        api.addTask(tobesendData)
            .then((task) => {
                props.saveTaskCallback(task);
                props.handleTaskModalClose(false)
            })
            .catch((error) => console.log(error))
    }

    return (
        <Modal
            open={props.openModal}
            onClose={() => { props.handleTaskModalClose(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h2>Add Task</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-addTask"
                            label="Task Name"
                            variant="outlined"
                            onChange={handleTaskChange}
                        />
                    </Grid>
                    <Grid item xs={6} spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={priorities}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Priority" />}
                            onChange={(event: any, newValue: any | null) => {
                                setPriority(newValue);
                            }}
                        />

                    </Grid>
                    {/* <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Create Date"
                                value={newDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Button variant='contained' onClick={saveTask}>
                            Save Task
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default CreateTask;