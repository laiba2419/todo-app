import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      if (response.data && response.data.token) {
        // Save token + user in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log("User data saved to localStorage:");

        // Navigate to todo page
        navigate("/todo");
      } else {
        console.log("Login failed");
        alert(response.data.message || "Login failed");
      }
      console.log("Login process completed");
    } catch (error) {
      console.log("Login error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // backend ka actual message show hoga
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
        Don't have account? Signup
      </p>
    </div>
  );
}

export default Login;
