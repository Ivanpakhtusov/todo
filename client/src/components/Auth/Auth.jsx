import React, { useState } from "react";
import Signin from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import "./Auth.css";

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <>
          <Signin
            setUser={setUser}
            handleToggle={handleToggle}
            className="auth-form"
          />
        </>
      ) : (
        <>
          <SignUp
            className="auth-form"
            setUser={setUser}
            handleToggle={handleToggle}
          />
        </>
      )}
    </div>
  );
}

export default Auth;
