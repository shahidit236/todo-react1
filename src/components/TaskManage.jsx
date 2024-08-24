import React from "react";

function TaskManage({ task, index, deleteTask, moveTaskUp, moveTaskDown,completedToggel, editTodo })
{
    return (
        <div className="Todo">
            <span onClick={()=>completedToggel(task.id)} className={`${task.completed ? 'completed' : "incompleted"}`}>{task.text}</span>
            <button className="edit-button" key={task.id} onClick={() => editTodo(task.id)}>
                ✏️
            </button>
            <button className="delete-button" onClick={() => deleteTask(index)}>
                🗑️
            </button>
            <button className="move-button" onClick={() => moveTaskUp(index)}>
                ☝️
            </button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>
                👇
            </button>
        </div>
    );
}

export default TaskManage;
