import React from "react";

/**
 *
 * @param {{task: import("../../../backend/models/Task.js").Task}} param0
 * @returns
 */
const TaskItem = ({ task, on_update, on_delete }) => {
  const handle_toggle_complete = () => {
    on_update(task._id, { ...task, completed: !task.completed }); // <-- use _id
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <small>{new Date(task.create_at).toLocaleDateString()}</small>
      </div>
      <div className="task-actions">
        <button
          onClick={handle_toggle_complete}
          className={task.completed ? "uncomplete-btn" : "complete-btn"}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => on_delete(task._id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
