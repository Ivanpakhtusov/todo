import React from "react";
import "./style.css";

function TaskItem({ task, responsibleUser }) {
  return (
    <div className="task-item">
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>Статус: {task.status}</p>
      <p>Приоритет: {task.priority}</p>
      {responsibleUser && <p>Ответственный: {responsibleUser.name}</p>}
    </div>
  );
}

export default TaskItem;
