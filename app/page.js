"use client";
import { useEffect, useState } from "react";
import TaskForm from "./_components/TaskForm";
import TaskItem from "./_components/TaskItem";
import FilterBar from "./_components/FilterBar";
import { fetchTasks, createTask, toggleTask, deleteTask } from "./_utils/api";

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [status, setStatus] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function filteredTasks() {
    return tasks.filter((t) => {
      if (status === "active" && t.done) return false;
      if (status === "completed" && !t.done) return false;
      if (!q) return true;
      return (t.title + " " + (t.description || ""))
        .toLowerCase()
        .includes(q.toLowerCase());
    });
  }

  async function handleCreate(task) {
    setTasks((prev) => [task, ...prev]);
    setFeedback("Task added");
    setTimeout(() => setFeedback(null), 2000);
  }

  async function handleToggle(task) {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t))
    );
    await toggleTask(task.id, !task.done);
  }

  async function handleDelete(task) {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    await deleteTask(task.id);
  }

  return (
    <main>
      <h1>Tasks</h1>
      <TaskForm onCreate={handleCreate} />
      <FilterBar
        status={status}
        q={q}
        onChange={({ status: s, q: search }) => {
          if (s !== undefined) setStatus(s);
          if (search !== undefined) setQ(search);
        }}
      />

      {feedback && <div>{feedback}</div>}
      {error && <div>{error}</div>}
      {loading && <div>Loading…</div>}

      {!loading && filteredTasks().length === 0 && <div>No tasks found.</div>}

      <ul>
        {filteredTasks().map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </main>
  );
}
