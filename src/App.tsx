import React, { useState, useEffect } from "react";
import "./App.css";
// import LoadingSpinner from "./components/LoadingSpinner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthRoutes from "./routes/AuthRoutes";
// import TodoList from "./components/ToDo/TodoList";
// import AddTodo from "./components/ToDo/AddTodo";
// import PrivateRoute from "./routes/PrivateRoute";
// import Header from "./components/Header";
import AuthRoutes from "./components/routes/AuthRoutes";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
