import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const taskAPI = {
  // Get all tasks
  get_all_task: () => api.get("/tasks"),

  // Create new tasks
  create_task: (task) => api.post("/tasks", task),

  // Update task
  update_task: (id, task) => api.put(`/tasks/${id}`, task),

  // Delete task
  delete_task: (id) => api.delete(`/tasks/${id}`),
};

export default api;
