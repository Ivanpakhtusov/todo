import axios from "axios";
import "./style.css";
import React, { useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import CreateeTaskFrom from "../CreateTaskForm/CreateTaskForm";

function TaskList({ sessionId }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users");
      const usersMap = response.data.reduce((acc, user) => {
        acc[user.id] = user;
        acc[user.login] = user;
        return acc;
      }, {});
      setUsers(usersMap);
      setCurrentUser(usersMap[sessionId]);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleOpenModal}>Create Task</button>
      <div className="task-list">
        <CreateeTaskFrom
          open={isModalOpen}
          onCreate={handleCreateTask}
          onCancel={handleCloseModal}
          creatorId={currentUser?.login}
        />
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            responsibleUser={users[task.responsible_id]}
            taskCreator={users[task.creator_id]}
            onUpdate={handleUpdateTask}
          />
        ))}
      </div>
    </>
  );
}

export default TaskList;
