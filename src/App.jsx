import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // 🟢 Load from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("todos"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // 🟢 Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  // ➕ Add or Update Task
  const handleAdd = () => {
    if (task === "") return;

    if (editIndex !== null) {
      // UPDATE
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // ADD
      setTasks([...tasks, task]);
    }

    setTask("");
  };

  // ❌ Delete Task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // ✏️ Edit Task
  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Todo App</h1>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={handleAdd}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <ul style={{ listStyle: "none" }}>
        {tasks.map((t, index) => (
          <li key={index} style={{ margin: "10px" }}>
            {t}

            <button onClick={() => editTask(index)}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;