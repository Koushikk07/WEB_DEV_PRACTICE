import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
let [task, setTask] = useState({ todo: "sample-task", id: uuidv4() });
let [tasks, setTasks] = useState([task]);
let [newTask, setNewTask] = useState("");


let updateTask = () => {
    if (newTask.trim() === "") return;

    const newTodo = {
        todo: newTask.trim(),
        id: uuidv4()
    };

    setTasks((prevTasks) => [...prevTasks, newTodo]);
    setNewTask("");
};

let removeTask = (id) => {
    setTasks((prevTasks) =>
        prevTasks.filter((todo) => todo.id !== id)
    );
};
let upperCaseAll=()=>{
    setTasks((prevTasks) =>
        prevTasks.map((task) => ({
            ...task,
            todo: task.todo.toUpperCase()
        }))
    );
}

let lowerCaseAll=()=>{
    setTasks((prevTasks) =>
        prevTasks.map((task) => ({
            ...task,
            todo: task.todo.toLowerCase()
        }))
    );
}


let upperCaseOne = (id) => {
    setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === id
                ? { ...task, todo: task.todo.toUpperCase() }
                : task
        )
    );
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
                {tasks.map((todo) => (
                    <li key={todo.id}>
                        {todo.todo}{" "}
                        <button onClick={() => removeTask(todo.id)}>
                            Delete
                        </button>
                        <button onClick={() => upperCaseOne(todo.id)}>
    Uppercase
</button>
                    </li>
                ))}
            </ul><br /><br />
            <button onClick={()=> upperCaseAll()}>upperCase</button><br />
            <button onClick={()=> lowerCaseAll()}>lowerCase</button>
        </div>
    </>
);


}
