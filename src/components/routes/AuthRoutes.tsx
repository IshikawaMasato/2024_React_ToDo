import React from "react";
import Signup from "../Auth/Signup";
// import Login from "../components/Auth/Login";

function AuthRoutes() {
  return (
    <div>
      <h1>Welcome to the ToDo App!</h1>
        <div>
          <div>
            <h1>Sign Up</h1>
            <Signup />
          </div>
        </div>
      </div>
  );
}

export default AuthRoutes;
