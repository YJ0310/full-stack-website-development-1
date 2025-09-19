import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.js";
import TaskItem from "./components/TaskItem.js";
import { taskAPI } from "./services/api.js";
import "./App.css";

const App = () => {
  const [tasks, set_tasks] = useState([]);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    fetch_tasks();
  }, []);

  const fetch_tasks = async () => {
    try {
      set_loading(true);
      const respone = await taskAPI.get_all_task();
      set_tasks(respone.data);
      set_error("");
      console.log("Fetched tasks:", respone.data);
    } catch (error) {
      set_error("Failed to fetch tasks. Make sure your backend is running!");
      console.error("Error fetching tasks:", error);
    } finally {
      set_loading(false);
    }
  };

  const handle_create_task = async (task_data) => {
    try {
      const respone = await taskAPI.create_task(task_data);
      set_tasks([respone.data, ...tasks]);
      set_error("");
    } catch (error) {
      set_error("Failed to created task");
      console.error("Error creating task:", error);
    }
  };

  const handle_update_task = async (id, update_task) => {
    try {
      const respone = await taskAPI.update_task(id, update_task);
      set_tasks(tasks.map((task) => (task._id === id ? respone.data.task : task)));
      set_error("");
    } catch (error) {
      set_error("Failed to update task");
      console.error("Error updating task:", error);
    }
  };

  const handle_delete_task = async (id) => {
    try {
      await taskAPI.delete_task(id);
      set_tasks(tasks.filter((task) => task._id !== id));
      set_error("");
    } catch (error) {
      set_error("Failed to delete task");
      console.error("Error deleting task:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading task ...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Task Manager</h1>
        <p>My first MERN application</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main className="main-content">
        <TaskForm onSubmit={handle_create_task} />

        <div className="task-selection">
          <h2>Your Task ({tasks.length}) </h2>
          {tasks.length === 0 ? (
            <p className="no-tasks">
              No Task yet! Add one above to get started.
            </p>
          ) : (
            <div className="tasks-list">
              {tasks
                .filter((task) => task && task._id)
                .map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    on_update={handle_update_task}
                    on_delete={handle_delete_task}
                  />
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
