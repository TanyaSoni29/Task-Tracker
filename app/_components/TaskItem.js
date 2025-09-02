"use client";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3 style={{ textDecoration: task.done ? "line-through" : "none" }}>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
      <div>
        <button onClick={() => onToggle(task.id)}>
          {task.done ? "Mark Undone" : "Mark Done"}
        </button>
        <button onClick={() => onDelete(task.id)} style={{ marginLeft: "10px", color: "red" }}>
          Delete
        </button>
      </div>
    </div>
  );
}
