import axios from "axios";
import "./style.css";
import React, { useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";

function TaskList({ sessionId, currentUser }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users");
      const usersMap = response.data.reduce((acc, user) => {
        acc[user.id] = user;
        acc[user.login] = user;
        return acc;
      }, {});
      setUsers(usersMap);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/tasks", {
        withCredentials: true,
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const handleUpdateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        }
        return task;
      })
    );
    fetchTasks();
  };

  const handleCreateTask = async (newTask) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/tasks",
        newTask,
        {
          withCredentials: true,
        }
      );
      setTasks([...tasks, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${taskId}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="create-task-button-container">
        <button className="create-task-button" onClick={handleOpenModal}>
          Create Task
        </button>
      </div>
      <div className="task-list">
        <CreateTaskForm
          open={isModalOpen}
          onCreate={handleCreateTask}
          onCancel={handleCloseModal}
          creatorId={currentUser?.login}
        />
        {tasks.map((task) => (
          <div key={task.id}>
            <TaskItem
              task={task}
              responsibleUser={users[task.responsible_id]}
              taskCreator={users[task.creator_id]}
              onUpdate={handleUpdateTask}
              handleDeleteTask={handleDeleteTask}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskList;
