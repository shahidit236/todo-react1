import React, { useState, useRef, useEffect } from "react";

const EditTask = ({ editTask, task }) => {
    const [value, setValue] = useState(task.text);
    const input = useRef(null);

    useEffect(() => {
        input.current.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        editTask(value, task.id); // Pass the new task text and task id to editTodo
        setValue(''); // Clear the input value
    };

    return (
        <div>
            <form className='EditTaskForm' onSubmit={handleSubmit}>
                <input
                    className='EditTaskInput'
                    ref={input}
                    value={value}
                    type="text"
                    placeholder='Edit Task'
                    onChange={(e) => setValue(e.target.value)} // Update value state
                />
                <button className='EditTaskButton' type="submit">Update Task</button>
            </form>
        </div>
    );
};

export default EditTask;
