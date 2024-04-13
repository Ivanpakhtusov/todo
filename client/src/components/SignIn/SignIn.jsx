import React, { useState } from "react";

function SignIn({ setUser, handleToggle }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data);
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
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>Логин</label>
      <input
        type="email"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <br />
      <label>Пароль</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Login</button>
      <button onClick={handleToggle} className="auth-toggle">
        Зарегистрироваться
      </button>
    </form>
  );
}

export default SignIn;
