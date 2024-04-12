import axios from "axios";
import React, { useState } from "react";

function SignIn({setUser}) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/signin", { login, password });
      console.log(response.data);
      setUser(response.data)
      setLogin("");
      setPassword("");
    } catch (error) {
      alert(error.response.data.message);
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

export default SignIn;
