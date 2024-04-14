import axios from "axios";
import "./style.css";
import React, { useCallback, useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";

function TaskList({ sessionId, currentUser }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [responsibleUser, setResponsibleUser] = useState("");

  const getResponsibleUsers = () => {
    return [...new Set(tasks.map((task) => task.responsible_id))];
  };
  const handleResponsibleUserChange = (e) => {
    setResponsibleUser(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filterTasks = () => {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    let filteredTasks = tasks;

    switch (activeFilter) {
      case "today":
        filteredTasks = filteredTasks.filter(
          (task) =>
            new Date(task.finishedAt).toDateString() === today.toDateString()
        );
        break;
      case "week":
        filteredTasks = filteredTasks.filter(
          (task) =>
            new Date(task.finishedAt) > today &&
            new Date(task.finishedAt) <= oneWeekFromNow
        );
        break;
      case "future":
        filteredTasks = filteredTasks.filter(
          (task) => new Date(task.finishedAt) > oneWeekFromNow
        );
        break;
      default:
        break;
    }

    if (responsibleUser) {
      filteredTasks = filteredTasks.filter(
        (task) => task.responsible_id.toString() === responsibleUser
      );
    }

    return filteredTasks;
  };

  const fetchUsers = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, [sessionId, currentUser, fetchUsers]);

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
  }, [sessionId, currentUser, fetchUsers]);

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
      <div className="select-container">
        <label htmlFor="responsible-user" className="select-label">
          Ответственный:
        </label>
        <select
          id="responsible-user"
          value={responsibleUser}
          onChange={handleResponsibleUserChange}
          className="select"
        >
          <option value="">-</option>
          {getResponsibleUsers().map((userId) => {
            const user = users[userId];
            return (
              <option key={userId} value={userId}>
                {user.surname} {user.name}
              </option>
            );
          })}
        </select>
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
