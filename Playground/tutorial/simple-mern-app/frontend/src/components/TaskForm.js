import React, { useState } from "react";

const TaskForm = ({ onSubmit }) => {
  const [title, set_title] = useState("");
  const [description, set_description] = useState("");

  const handle_submit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit({ title, description });
      set_title("");
      set_description("");
    }
  };

  return (
    <form onSubmit={handle_submit} className="task-form">
      <h2>Add New Task</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Task Title ..."
          value={title}
          onChange={(e) => {
            set_title(e.target.value);
          }}
          required
        />
      </div>
      <div className="form-group">
        <textarea
        placeholder="Task Description ..."
        value={description}
        onChange={(e)=>set_description(e.target.value)}
        required
        />
      </div>
      <button type="submit" className="submit-btn">Add Task</button>
    </form>
  );
};


export default TaskForm;