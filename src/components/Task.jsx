import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { Stack } from "@mui/system"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteTaskFirebase, patchTaskFirebase } from "../function/taskFunctions";

const Task = (props) => {
    const {descripcion, terminado, key} = props.task
    const {refreshArrayTasks, setValuesToModalAndOpen} = props.callbacks

    const handleChange = async (id, checked) => {
        const task = {
            terminado: checked
        }
        try {
            const resp = await patchTaskFirebase(id, task)
            console.log(resp.status)
            refreshArrayTasks()
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleDelete = async (key) => {
        try {
            const resp = await deleteTaskFirebase(key)
            console.log(resp.status)
            refreshArrayTasks()
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (key, descripcion) => {
        setValuesToModalAndOpen(key, descripcion)
    }

    return (
        <ListItem
            sx={{border:" 1px solid #d6d6d6", borderRadius: "15px", marginTop:"3px", marginBottom:"3px"}}
            secondaryAction={
                <Stack direction="row" spacing={2}>
                    {
                        !terminado && 
                        <IconButton onClick={()=>{handleEdit(key, descripcion)}} edge="end" aria-label="edit" color="info">
                            <EditIcon />
                        </IconButton>
                    }
                    <IconButton onClick={()=>{handleDelete(key)}} edge="end" aria-label="delete" color="error">
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            }
        >
            <ListItemIcon>
                <Checkbox  
                    checked={terminado}
                    onChange={(event)=>{handleChange(key, event.target.checked)}}
                    edge="start"
                />
            </ListItemIcon>
            <ListItemText sx={{textDecoration:terminado?"line-through":"none"}} primary={descripcion} />
        </ListItem>
    )
}

export default Task