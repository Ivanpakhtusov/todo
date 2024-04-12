import axios from "axios";
import "./style.css";
import React, { useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/tasks");
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
          return acc;
        }, {});
        setUsers(usersMap);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
    fetchUsers();
  }, []);

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          responsibleUser={users[task.responsible_id]}
        />
      ))}
    </div>
  );
}

export default TaskList;
