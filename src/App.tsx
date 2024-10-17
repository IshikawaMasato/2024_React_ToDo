import React from "react";
import "./App.css";
// import LoadingSpinner from "./components/LoadingSpinner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthRoutes from "./routes/AuthRoutes";
import TodoList from "./components/ToDo/ToDoList";
// import AddTodo from "./components/ToDo/AddTodo";
// import PrivateRoute from "./routes/PrivateRoute";
// import Header from "./components/Header";
import AuthRoutes from "./components/routes/AuthRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthRoutes />} />
        <Route path="/ToDoList" element={<TodoList />} />
      </Routes>
    </Router>
  );
};

export default App;
