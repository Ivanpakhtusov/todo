import React, { useEffect, useState } from "react";
import axios from "axios";
import SignIn from "../components/SignIn/SignIn";
import TaskList from "../components/TaskList/TaskList";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/auth/checkUser");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/auth/logout");
      setUser(null);
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
          <TaskList />
        </>
      ) : (
        <SignIn setUser={setUser} />
      )}
    </>
  );
}

export default App;
