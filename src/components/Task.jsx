import React, { useState } from "react";
import styles from "../app.module.css";

const Task = ({ task, onDelete }) => {
    const [isChecked, setIsChecked] = useState(task.status); 
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked); 
    };
  
    return (
      <div className={styles.taskStyl}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange} 
        />
        <p
          style={{
            textDecoration: isChecked ? "line-through" : "none", 
          }}
          className={styles.taskTitle}
        >
          {task.task}
        </p>
        <button
          className={styles.dltBtn}
          onClick={() => onDelete(task._id)}
          disabled={!isChecked} 
        >
          Delete
        </button>
      </div>
    );
  };

export default Task;
