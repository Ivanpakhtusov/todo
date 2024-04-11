import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";

function App() {
  return (
    <Router>
      <SignUp />
      <SignIn />
    </Router>
  );
}

export default App;
