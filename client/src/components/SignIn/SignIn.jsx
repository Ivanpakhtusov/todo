import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("/auth/signin", { login, password });
      console.log(response.data);
      setLogin("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Логин:
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </label>
      <br />
      <label>
        Пароль:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Войти</button>
    </form>
  );
}

export default LoginForm;
