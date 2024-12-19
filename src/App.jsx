import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import Task from "./components/Task";

const URL = "https://to-do-api-16y6.onrender.com"; 

const App = () => {
  const [tasks, setTasks] = useState([]); 
  const [task, setTask] = useState(""); // New task input


  const fetchTasks = async () => {
    try {
      const res = await fetch(`${URL}`);
      const data = await res.json();
      setTasks(data); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task
  const handleAddTask = async () => {
    try {
      if (!task.trim()) {
        return alert("Task cannot be empty");
      }

      const res = await fetch(`${URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setTask(""); 
        setTasks((prev) => [...prev, { task }]); // Update tasks
        fetchTasks();
      } else {
        alert("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // delete task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        setTasks(tasks.filter((task) => task._id !== id));
        alert(data.message);
      } else {
        alert("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Fetch tasks from the backend
  useEffect(() => {
    fetchTasks();
  }, []);


  return (
    <div className={styles.main}>
      <div className={styles.todoContainer}>
        <div className={styles.headig}>
          <h1>To-do list</h1>
          <div className={styles.taskInput}>
            <input
              type="text"
              placeholder="Enter Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handleAddTask}>+ Add</button>
          </div>
        </div>
        <div className={styles.taskContainer}>
          {tasks.map((taskItem) => (
            <Task
              key={taskItem._id}
              task={taskItem}
              onDelete={(id) => deleteTask(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
