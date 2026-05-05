return (
  <div className="app">
    <h1>My Todo List</h1>

    <div className="inputBox">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task..."
      />

      <button onClick={handleAdd}>
        {editIndex !== null ? "Update" : "Add"}
      </button>
    </div>

    <ul>
      {tasks.map((t, index) => (
        <li key={index}>
          <span>{t}</span>

          <div className="actions">
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
);