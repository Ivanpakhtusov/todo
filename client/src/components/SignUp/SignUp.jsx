import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/signup", {
        name,
        surname,
        middlename,
        login,
        password,
      });
      console.log(response.data);
      setName("");
      setSurname("");
      setMiddlename("");
      setLogin("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="signup-form" onSubmit={onHandleSubmit}>
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
    </form>
  );
}

export default SignUp;
