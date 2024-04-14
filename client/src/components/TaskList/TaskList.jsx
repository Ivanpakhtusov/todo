import axios from "axios";
import "./style.css";
import React, { useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";

function TaskList({ sessionId, currentUser }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filterTasks = () => {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    switch (activeFilter) {
      case "today":
        return tasks.filter(
          (task) =>
            new Date(task.finishedAt).toDateString() === today.toDateString()
        );
      case "week":
        return tasks.filter(
          (task) =>
            new Date(task.finishedAt) > today &&
            new Date(task.finishedAt) <= oneWeekFromNow
        );
      case "future":
        return tasks.filter(
          (task) => new Date(task.finishedAt) > oneWeekFromNow
        );
      default:
        return tasks;
    }
  };

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
  }, [sessionId, currentUser]);

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
        {currentUser.isManager && (
          <button className="create-task-button" onClick={handleOpenModal}>
            Create Task
          </button>
        )}
      </div>
      <div className="filter-buttons-container">
        <button
          className={`filter-button ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={`filter-button ${
            activeFilter === "today" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("today")}
        >
          Today
        </button>
        <button
          className={`filter-button ${activeFilter === "week" ? "active" : ""}`}
          onClick={() => handleFilterChange("week")}
        >
          Week
        </button>
        <button
          className={`filter-button ${
            activeFilter === "future" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("future")}
        >
          Future
        </button>
      </div>
      <div className="task-list">
        <CreateTaskForm
          open={isModalOpen}
          onCreate={handleCreateTask}
          onCancel={handleCloseModal}
          creatorId={currentUser?.login}
          users={users}
          currentUser={currentUser}
        />
        {filterTasks().map((task) => (
          <div key={task.id}>
            <TaskItem
              task={task}
              responsibleUser={users[task.responsible_id]}
              taskCreator={users[task.creator_id]}
              onUpdate={handleUpdateTask}
              handleDeleteTask={handleDeleteTask}
              currentUser={currentUser}
              users={users}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskList;
