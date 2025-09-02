"use client";

export default function TaskFilters({
  filter,
  search,
  onFilterChange,
  onSearchChange,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div>
        <button
          onClick={() => onFilterChange("all")}
          disabled={filter === "all"}
        >
          All
        </button>
        <button
          onClick={() => onFilterChange("active")}
          disabled={filter === "active"}
          style={{ marginLeft: "5px" }}
        >
          Active
        </button>
        <button
          onClick={() => onFilterChange("completed")}
          disabled={filter === "completed"}
          style={{ marginLeft: "5px" }}
        >
          Completed
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
