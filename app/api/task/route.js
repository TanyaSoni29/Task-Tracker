import { tasksStore } from "../../../_lib/store";

export async function GET() {
  return new Response(JSON.stringify(tasksStore.list()), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const { title, description } = await req.json();

  if (!title || typeof title !== "string" || !title.trim()) {
    return new Response(JSON.stringify({ error: "Title is required" }), {
      status: 400,
    });
  }
  if (title.length > 200) {
    return new Response(
      JSON.stringify({ error: "Title too long (max 200 chars)" }),
      { status: 400 }
    );
  }

  const task = tasksStore.create({
    title: title.trim(),
    description: (description || "").trim(),
  });

  return new Response(JSON.stringify(task), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
