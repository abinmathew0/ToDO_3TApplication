// src/App.js
import React, { useState } from "react";
import "./App.css";

// Navigation Bar Component
const NavBar = () => (
  <nav className="navbar">
    <div className="container">
      <h1 className="logo">Task Manager</h1>
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <a href="/">Contact</a>
        </li>
      </ul>
    </div>
  </nav>
);

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p>
        &copy; {new Date().getFullYear()} Task Management App. All rights
        reserved.
      </p>
    </div>
  </footer>
);

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Toggle task completion
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <>
      <NavBar />
      <div className="App container">
        <h2>Manage Your Tasks</h2>
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        {tasks.length === 0 ? (
          <p>No tasks yet. Start by adding one!</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? "completed" : ""}`}
              >
                <span onClick={() => toggleTask(task.id)} className="task-text">
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
