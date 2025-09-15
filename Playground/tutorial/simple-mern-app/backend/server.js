import express from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { router as task_routes } from "./routes/task.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());

// mongodb connection

mongoose.connect(process.env.mongoURI || "mongodb://localhost/takoo/test");

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// use routes

app.use("/api/tasks", task_routes);

// routes

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Task Manager API!" });
});

// Start Server

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
