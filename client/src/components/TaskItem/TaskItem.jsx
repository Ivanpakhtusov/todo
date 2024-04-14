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
  currentUser,
  users,
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

  const getTitleColor = (task) => {
    if (task.status === "done") {
      return "task-title-green";
    }

    if (task.finishedAt && new Date(task.finishedAt) < new Date()) {
      return "task-title-red";
    }

    return "task-title-gray";
  };
  const statusTranslations = {
    toDo: "К выполнению",
    inProgress: "В процессе",
    done: "Выполнено",
    cancelled: "Отменено",
  };

  const priorityTranslations = {
    high: "Высокий",
    medium: "Средний",
    low: "Низкий",
  };
  return (
    <div className="task-item">
      <h3 className={getTitleColor(task)}>{task.title}</h3>
      <p>{task.description}</p>
      <p>Статус: {statusTranslations[task.status]}</p>
      <p>Приоритет: {priorityTranslations[task.priority]}</p>
      {responsibleUser && (
        <p>
          Ответственный: {responsibleUser.surname} {responsibleUser.name}
        </p>
      )}
      {taskCreator && (
        <p>
          Менеджер задачи: {taskCreator.surname} {taskCreator.name}
        </p>
      )}
      {task.finishedAt && (
        <p>Дата окончания: {new Date(task.finishedAt).toLocaleDateString()}</p>
      )}
      {currentUser.id === task.responsible_id && (
        <button onClick={handleModal}>Изменить задачу</button>
      )}
      {currentUser.isManager && (
        <DeleteTask task={task} onDelete={handleDeleteTask} />
      )}

      <TaskModal
        open={modal}
        onCreate={handleOk}
        onCancel={handleCancel}
        task={task}
        onUpdate={onUpdate}
        currentUser={currentUser}
        users={users}
      />
    </div>
  );
}

export default TaskItem;
