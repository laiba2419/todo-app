import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Todo from "./pages/Todo.jsx";

function App() {
  const isLoggedIn = localStorage.getItem("user") === "loggedIn";

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/todo" /> : <Login />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/todo"
        element={ <Todo />}
      />
    </Routes>
  );
}

export default App;
