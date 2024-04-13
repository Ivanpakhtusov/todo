import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../components/Auth/Auth";
import TaskList from "../components/TaskList/TaskList";
import Loading from "../components/Loading/Loading";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);

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
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {currentUser ? (
        <>
          <header className="header">
            <div className="user-actions">
              <div className="user-name">{currentUser.name}</div>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </header>
          <TaskList sessionId={sessionId} currentUser={currentUser} />
        </>
      ) : (
        <Auth setUser={setCurrentUser} />
      )}
    </>
  );
}

export default App;
