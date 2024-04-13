import React from "react";
import loading from "../../assets/loading.gif";
import "./loading.css";

function Loading() {
  return (
    <div className="loader">
      <img className="loading" src={loading} alt="loading" />
    </div>
  );
}

export default Loading;
