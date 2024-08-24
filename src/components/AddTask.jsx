import React, { useState , useRef } from "react";

function AddTask({ onAddTask })
{
    const [newTask, setNewTask] = useState("");
    const input = useRef(null)
    // function handleInputChange(event) 
    // {
    //     setNewTask(event.target.value);
    // }

    const handleSumbit = (e) =>
    {
        e.preventDefault()
        onAddTask(newTask)
        setNewTask('')
    }

    // function addTasks(text) 
    // {
    //     if (text.trim() !== "")
    //     {
    //         const newTask = {id : uuidv4 () , text : text , completed : false ,isEditing : false}
    //         onAddTask(newTask);
    //         setNewTask("");
    //         toast.success('Successfully added task!')
    //     }
    //     else
    //     {
    //         toast.error("Enter valid task")
    //     }
    // }

    return (
        <div>
            <form className='TodoForm' onSubmit={handleSumbit}>
                <input
                    type="text"
                    placeholder="Enter a task ..."
                    value={newTask}
                    onChange={((e)=>setNewTask(e.target.value))}
                />
                <button className="add-button" type="submit">
                    Add
                </button>
            </form>
        </div>
    );
}

export default AddTask;