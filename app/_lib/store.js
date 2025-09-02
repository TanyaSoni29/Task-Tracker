import { nanoid } from "nanoid";

const tasks = new Map();

export const tasksStore = {
  create({ title, description = "" }) {
    const id = nanoid();
    const item = {
      id,
      title,
      description,
      done: false,
      createdAt: new Date().toISOString(),
    };
    tasks.set(id, item);
    return item;
  },
  list() {
    return Array.from(tasks.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },
  get(id) {
    return tasks.get(id) || null;
  },
  update(id, fields = {}) {
    const ex = tasks.get(id);
    if (!ex) return null;
    const updated = {
      ...ex,
      ...Object.fromEntries(
        Object.entries(fields).filter(([_, v]) => v !== undefined)
      ),
    };
    tasks.set(id, updated);
    return updated;
  },
  remove(id) {
    return tasks.delete(id);
  },
};
