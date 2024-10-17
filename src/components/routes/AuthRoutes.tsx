import React from "react";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";

function AuthRoutes() {
  return (
    <div className="container is-fluid">
      <h1 className="title has-text-centered">Welcome to the ToDo App!</h1>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box">
            <h1 className="title has-text-centered">Login</h1>
            <Login />
          </div>
        </div>
        <div className="column is-half">
          <div className="box">
            <h1 className="title has-text-centered">Sign Up</h1>
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthRoutes;
