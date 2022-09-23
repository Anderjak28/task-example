const getArrayFromObject = (object) => {
    const keys = Object.keys(object)
    const resp = keys.map((key) => {
        return {key: key, terminado: object[key].terminado, descripcion: object[key].descripcion}
    })
    return resp
}

const getTasksFirebase = async() => {
    try {
        const resp = await fetch("https://my-first-web-9856e-default-rtdb.firebaseio.com/tareas.json")
        const data = await resp.json()
        const arrayTasks = getArrayFromObject(data)
        return arrayTasks
    } catch (error) {
        console.log(error)
    }
}

const postTaskFirebase = async(task) => {
    try {
        const resp = await fetch("https://my-first-web-9856e-default-rtdb.firebaseio.com/tareas.json",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        return(resp)
    } catch (error) {
        console.log(error)
        return(false)
    }
}

const deleteTaskFirebase = async (id) => {
    try {
        const resp = await fetch("https://my-first-web-9856e-default-rtdb.firebaseio.com/tareas/"+id+".json",{
            method: "DELETE"
        })
        return (resp)
    } catch (error) {
        console.log(error)
    }
}

const patchTaskFirebase = async (id, task) => {
    try {
        const resp = await fetch("https://my-first-web-9856e-default-rtdb.firebaseio.com/tareas/"+id+".json",{
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        return resp
    } catch (error) {
        console.log(error)
    }
}

export {getTasksFirebase, postTaskFirebase, deleteTaskFirebase, patchTaskFirebase}