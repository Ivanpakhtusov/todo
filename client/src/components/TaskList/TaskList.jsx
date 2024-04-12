import axios from "axios";
import "./style.css";
import React, { useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem";

function TaskList({ sessionId }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
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

    fetchTasks();
    fetchUsers();
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
  };

  return (
    <div className="task-list">
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
  );
}

export default TaskList;
