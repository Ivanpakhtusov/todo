import React, { useEffect, useState } from "react";
import axios from "axios";
import SignIn from "../components/SignIn/SignIn";
import TaskList from "../components/TaskList/TaskList";

function App() {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const cookie = document.cookie.split("; ").find((row) => row.startsWith("user_sid="));

      if (cookie) {
        try {
          const response = await axios.get("http://localhost:4000/auth/checkUser", {
            withCredentials: true,
          });
          setUser(response.data.user);
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
      setUser(null);
      setSessionId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user ? (
        <>
          <div>{user.name}</div>
          <button onClick={handleLogout}>Logout</button>
          <TaskList sessionId={sessionId}/>
        </>
      ) : (
        <SignIn setUser={setUser} />
      )}
    </>
  );
}

export default App;
