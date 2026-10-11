import { useState } from "react";

export default function TodoList() {
let [task, setTask] = useState([]);
let [newTask, setNewTask] = useState("");


let updateTask = () => {
    if (newTask.trim() === "") return;

    setTask((prevTask) => [...prevTask, newTask.trim()]);
    setNewTask("");
};

let removeTask = (index) => {
    setTask((prevTask) => prevTask.filter((_, i) => i !== index));
};

return (
    <>
        <div>
            <h2>Todo List</h2>
        </div>

        <div>
            <input
                type="text"
                placeholder="Enter The Task"
                name="task"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        updateTask();
                    }
                }}
            />

            <button onClick={updateTask}>Add</button>
        </div>

        <div>
            <h3>My Tasks</h3>

            <ul>
                {task.map((todo, index) => (
                    <li key={index}>
                        {todo}{" "}
                        <button onClick={() => removeTask(index)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </>
);


}
