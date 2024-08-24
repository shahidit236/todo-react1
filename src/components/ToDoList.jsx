import React, { useState , useEffect } from "react";
import { v4 as uuidv4  } from 'uuid'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTask from "./AddTask";
import TaskManage from "./TaskManage";
import EditTask from "./EditTask";

function ToDoList()
{
    const [tasks, setTasks] = useState(() =>
    {
        const localValue = localStorage.getItem("TASKS")
        if(localValue === null)return []
        return JSON.parse(localValue)
    });

    function addTasks(text) 
    {
        if (text.trim() !== "")
        {
            const newTask = {id : uuidv4 () , text : text , completed : false ,isEditing : false}
            const updateTask = [...tasks,newTask]
            setTasks(updateTask)
            toast.success('Successfully added task!')
        }
        else
        {
            toast.error("Enter valid task")
        }
    }

    useEffect(() =>
    {
        localStorage.setItem("TASKS" , JSON.stringify(tasks))
    },[tasks])

    function deleteTask(index) 
    {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        })
        .then((result) =>
        {
            if (result.isConfirmed)
            {
                const updatedTasks = tasks.filter((_, i) => i !== index);
                setTasks(updatedTasks);
                Swal.fire("Deleted!", "Your task has been deleted.", "success");
            }
        });
    }

    function moveTaskUp(index)
    {
        const updatedTasks = [...tasks]
        if(index > 0)
        {
            
            [ updatedTasks[index], updatedTasks[index - 1] ] = [ updatedTasks[index - 1] , updatedTasks[index] ]
            setTasks(updatedTasks)
        }            
    }

    function moveTaskDown(index)
    {
        const updatedTasks = [...tasks]
        if(index < updatedTasks.length - 1)
        {
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }    
    }

    const completedToggel = (id) =>
    {
        setTasks(tasks.map(task => task.id === id ? ({...task,completed : !task.completed}) : task ))
        toast.success('Task Completed / Task undo')
    }

    const editTodo = (id) =>
    {
        console.log(id)
        const updatedTask = tasks.map(todo => todo.id === id ? ({...todo, isEditing : !todo.isEditing }) : todo)
        setTasks(updatedTask)
    };
    
        const editTask = (task,id) =>
        { 
          const updatedTask = tasks.map(todo => todo.id === id ? ({...todo,text : task ,isEditing: !todo.isEditing }) : todo)
          setTasks(updatedTask)
          toast.success('Successfully Updated Task!')
        }
    

    return (
        <div className="to-do-list">
            <h1>To-Do-List😎</h1>
            <AddTask onAddTask={addTasks} />
            <>
                {
                    tasks.map((task, index) => 
                    {
                        return(
                            task.isEditing ? (
                                <EditTask key={index} editTask={editTask} task={task}/>
                            ) : (
                                <TaskManage
                                    key={index}
                                    task={task}
                                    index={index}
                                    deleteTask={deleteTask}
                                    moveTaskUp={moveTaskUp}
                                    moveTaskDown={moveTaskDown}
                                    completedToggel={completedToggel}
                                    editTodo={editTodo}
                                />
                            )
                        )
                    })
                }
            </  >
            <ToastContainer />
        </div>
        
    );
}

export default ToDoList;
