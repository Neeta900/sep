import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // for user only
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]); // store user accounts
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");

  const navigate = useNavigate();

  // Predefined admin
  const admin = { email: "neeta@gmail.com", password: "123456" };

  const handleAuth = () => {
    if (!email || !password) {
      setMessage("Credentials cannot be empty");
      setMessageColor("red");
      return;
    }

    // Check for admin credentials
    if (email === admin.email && password === admin.password) {
      setMessage("Admin login successful!");
      setMessageColor("green");
      navigate("/admin");
      return;
    }

    // User login/signup
    if (isLogin) {
      const user = users.find((u) => u.email === email);
      if (!user) {
        setMessage("User not found. Please sign up first.");
        setMessageColor("red");
      } else if (user.password !== password) {
        setMessage("Incorrect password.");
        setMessageColor("red");
      } else {
        setMessage("Login successful!");
        setMessageColor("green");
        navigate("/user");
      }
    } else {
      // Signup
      if (users.find((u) => u.email === email)) {
        setMessage("User already exists. Please login.");
        setMessageColor("red");
      } else if (password.length < 6) {
        setMessage("Password must be at least 6 characters.");
        setMessageColor("red");
      } else {
        setUsers([...users, { email, password }]);
        setMessage("Signup successful! Please login now.");
        setMessageColor("green");
        setIsLogin(true);
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {message && <p style={{ color: messageColor }}>{message}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleAuth}>{isLogin ? "Login" : "Get Started"}</button>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => { setIsLogin(!isLogin); setMessage(""); }}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
