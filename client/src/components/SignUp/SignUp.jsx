import React, { useState } from "react";

function SignUp({ setUser, handleToggle }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, middlename, login, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data);
        setName("");
        setSurname("");
        setMiddlename("");
        setLogin("");
        setPassword("");
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="auth-form" onSubmit={onHandleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="name"
        type="text"
      />
      <label htmlFor="surname">Surname</label>
      <input
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        id="surname"
        type="text"
      />
      <label htmlFor="middlename">Middlename</label>
      <input
        value={middlename}
        onChange={(e) => setMiddlename(e.target.value)}
        id="middlename"
        type="text"
      />
      <label htmlFor="login">Login</label>
      <input
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        id="login"
        type="text"
      />
      <label htmlFor="password">Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        type="password"
      />
      <button type="submit">Sign Up</button>
      <button onClick={handleToggle} className="auth-toggle">
        Войти
      </button>
    </form>
  );
}

export default SignUp;
