import { tasksStore } from "../../../../_lib/store";

export async function PUT(req, { params }) {
  const { id } = params;
  const { title, description, toggleDone } = await req.json();

  const existing = tasksStore.get(id);
  if (!existing)
    return new Response(JSON.stringify({ error: "Task not found" }), {
      status: 404,
    });

  if (toggleDone !== undefined) {
    const updated = tasksStore.update(id, { done: !!toggleDone });
    return new Response(JSON.stringify(updated), { status: 200 });
  }

  if (title !== undefined && (!title || !title.trim())) {
    return new Response(JSON.stringify({ error: "Title is required" }), {
      status: 400,
    });
  }

  const updated = tasksStore.update(id, {
    title: title?.trim(),
    description: description?.trim(),
  });

  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const removed = tasksStore.remove(id);
  if (!removed)
    return new Response(JSON.stringify({ error: "Task not found" }), {
      status: 404,
    });
  return new Response(null, { status: 204 });
}
