
import './App.css';
import { Button, List, Modal, Paper, Stack, TextField } from '@mui/material';
import Task from './components/Task';
import { useEffect, useState } from 'react';
import { getTasksFirebase, patchTaskFirebase, postTaskFirebase } from './function/taskFunctions';

function App() {

    const [arrayTasks, setArrayTasks] = useState(null)
    const [description, setDescription] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [editDescription, setEditDescription] = useState("")
    const [key, setKey] = useState("")

    const refreshArrayTasks = async () => {
        const tasks = await getTasksFirebase()
        setArrayTasks(tasks)
    }

    const setValuesToModalAndOpen = (key, editDescription) =>{
        setKey(key)
        setEditDescription(editDescription)
        setOpenModal(true)
    }

    const buttonSaveHandler = async () => {
        const task = {
            descripcion: description,
            terminado: false
        }
        try {
            const resp = await postTaskFirebase(task)
            console.log(resp.status)
            setDescription("")
            refreshArrayTasks()
        } catch (error) {
            console.log(error)
        }
    }

    const buttonEditHandler = async () => {
        const task = {
            descripcion: editDescription    
        }
        try {
            const resp = await patchTaskFirebase(key, task)
            setOpenModal(false)
            console.log(resp.status)
            refreshArrayTasks()
        } catch (error) {
            console.log(error)
        }
    }

    const onCloseModal = () => {
        setKey("")
        setEditDescription("")
    }

    useEffect(()=>{
        (async () => {
            const tasks = await getTasksFirebase()
            setArrayTasks(tasks)
        })()
    },[])

    return (
        <div className="App">
            <header className="App-header">
                <Stack spacing={2} sx={{width:"70%"}} >
                    <Stack direction="row" spacing={2} sx={{width:"100%"}}>
                        <TextField 
                            onChange={(event)=>{setDescription(event.target.value)}} 
                            value={description} 
                            fullWidth  
                            label="Introduzca una tarea" 
                            variant="filled"
                        />
                        <Button onClick={buttonSaveHandler} variant='contained'>Guardar</Button>
                    </Stack>
                    <List sx={{width:"100%", height:"100%"}}>
                        {
                            arrayTasks && 
                            <>
                                {
                                    arrayTasks.map((task)=>{
                                        return <Task 
                                            key={task.key} 
                                            task={task} 
                                            callbacks = {{refreshArrayTasks: refreshArrayTasks, setValuesToModalAndOpen: setValuesToModalAndOpen}}
                                        />
                                    }) 
                                }
                            </>
                        }
                    </List>
                </Stack>
            </header>
            <Modal
                open={openModal}
                onClose = {onCloseModal}
            >
                <Paper elevation={7} 
                    sx={{
                        width:"70%", 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding:"20px"
                    }}
                >
                    <Stack spacing={2}>
                        <TextField 
                            fullWidth  
                            value={editDescription}
                            onChange={(event)=>{setEditDescription(event.target.value)}}
                            label="Editar tarea" 
                            variant="filled"
                        />
                        <Stack direction="row" spacing={2}>
                            <Button onClick={()=>{setOpenModal(false)}} variant='contained' color='error'>
                                Cancelar
                            </Button>
                            <Button onClick={buttonEditHandler}  variant='contained' color='info'>
                                Aceptar
                            </Button>
                        </Stack>
                    </Stack>
                    
                </Paper>
            </Modal>
        </div>
    );
}

export default App;
