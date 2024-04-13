import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../components/Auth/Auth";
import TaskList from "../components/TaskList/TaskList";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_sid="));
      if (cookie) {
        try {
          const response = await axios.get(
            "http://localhost:4000/auth/checkUser",
            {
              withCredentials: true,
            }
          );
          setCurrentUser(response.data.user);

          setSessionId(response.data.sessionId);
        } catch (error) {
          console.log(error);
        }
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/auth/logout", {
        withCredentials: true,
      });
      setCurrentUser(null);
      setSessionId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {currentUser ? (
        <>
          <div>{currentUser.name}</div>
          <button onClick={handleLogout}>Logout</button>
          <TaskList sessionId={sessionId} currentUser={currentUser} />
        </>
      ) : (
        <Auth setUser={setCurrentUser} />
      )}
    </>
  );
}

export default App;
