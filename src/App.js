import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL =
  "https://backend3ta-dcfue8fsbrfrh4b4.canadacentral-01.azurewebsites.net";

const NavBar = () => (
  <nav className="navbar">
    <div className="container">
      <h1 className="logo">Task Manager</h1>
    </div>
  </nav>
);

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

  // Fetch tasks from the backend
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTask }),
    });

    if (response.ok) {
      const newTaskFromServer = await response.json();
      setTasks([...tasks, newTaskFromServer]);
      setNewTask("");
    } else {
      console.error("Failed to add task");
    }
  };

  // Toggle task completion
  const toggleTask = async (id, completed) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } else {
      console.error("Failed to update task");
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    } else {
      console.error("Failed to delete task");
    }
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
                <span
                  onClick={() => toggleTask(task.id, task.completed)}
                  className="task-text"
                >
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
