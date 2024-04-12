import React from "react";

function TaskItem({task}) {
  return (
    <div>
      <p>{task.title}</p>
      <p>{task.description}</p>
    </div>
  );
}

export default TaskItem;
