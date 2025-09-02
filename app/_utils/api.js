export async function fetchTasks(filter, search) {
  const res = await fetch(
    `/api/tasks?filter=${filter}&search=${encodeURIComponent(search)}`
  );
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(task) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create task");
  }
  return res.json();
}

export async function toggleTask(id) {
  const res = await fetch(`/api/tasks/${id}/toggle`, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to toggle task");
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
}
