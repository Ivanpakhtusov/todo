import React, { useState } from "react";
import "./style.css";
import TaskModal from "../TaskModal/TaskModal";
import DeleteTask from "../DeleteTask/DeleteTask";

function TaskItem({
  task,
  responsibleUser,
  taskCreator,
  onUpdate,
  handleDeleteTask,
}) {
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
      {task.finishedAt && (
        <p>Дата окончания: {new Date(task.finishedAt).toLocaleDateString()}</p>
      )}
      <button onClick={handleModal}>Изменить задачу</button>
      <DeleteTask task={task} onDelete={handleDeleteTask} />

      <TaskModal
        open={modal}
        onCreate={handleOk}
        onCancel={handleCancel}
        task={task}
        onUpdate={onUpdate}
      />
    </div>
  );
}

export default TaskItem;
