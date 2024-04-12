import React, { useState } from "react";
import "./style.css";
import TaskModal from "../TaskModal/TaskModal";

function TaskItem({ task, responsibleUser, taskCreator, onUpdate }) {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(true);
  };

  const handleOk = (updatedTask) => {
    onUpdate(updatedTask);
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  return (
    <div className="task-item">
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>Статус: {task.status}</p>
      <p>Приоритет: {task.priority}</p>
      {responsibleUser && <p>Ответственный: {responsibleUser.name}</p>}
      {taskCreator && (
        <p>
          Менеджер задачи: {taskCreator.surname} {taskCreator.name}
        </p>
      )}
      <button onClick={handleModal}>Изменить задачу</button>
      <TaskModal
        open={modal}
        onCreate={handleOk}
        onCancel={handleCancel}
        task={task}
      />
    </div>
  );
}

export default TaskItem;
