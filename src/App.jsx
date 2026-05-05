import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (task === "") return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = task;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div className="card">
        <h1>✨ My Todo List</h1>

        <div className="inputBox">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter your task..."
          />
          <button onClick={handleAdd}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul>
          {tasks.map((t, index) => (
            <li key={index}>
              <span>{t}</span>

              <div>
                <button className="edit" onClick={() => editTask(index)}>
                  Edit
                </button>
                <button className="delete" onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;