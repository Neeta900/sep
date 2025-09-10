import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa";
import "./Auth.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]); // store users locally
  const [message, setMessage] = useState(""); // message to show in box
  const [messageColor, setMessageColor] = useState("red"); // red for error, green for success

  // Simple email validation
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleAuth = () => {
    if (!email || !password) {
      setMessage("Login credentials are empty.");
      setMessageColor("red");
      return;
    }

    if (isLogin) {
      const user = users.find((u) => u.email === email);
      if (!user) {
        setMessage("User not found. Please sign up first.");
        setMessageColor("red");
      } else if (user.password !== password) {
        setMessage("Login credentials are incorrect.");
        setMessageColor("red");
      } else {
        setMessage("Login successful!");
        setMessageColor("green");
      }
    } else {
      // SIGNUP validations
      if (!validateEmail(email)) {
        setMessage("Invalid email format.");
        setMessageColor("red");
        return;
      }
      if (password.length < 6) {
        setMessage("Password must be at least 6 characters.");
        setMessageColor("red");
        return;
      }
      const exists = users.find((u) => u.email === email);
      if (exists) {
        setMessage("User already exists. Please login.");
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
        <h2>{isLogin ? "Login" : "Sign Up"} to One</h2>

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
        {isLogin && <p className="forgot">Forgot Password?</p>}

        <button onClick={handleAuth}>{isLogin ? "Login" : "Get Started"}</button>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => { setIsLogin(!isLogin); setMessage(""); }}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

        <div className="social-login">
          <button className="google">
            <FaGoogle /> Google
          </button>
          <button className="facebook">
            <FaFacebook /> Facebook
          </button>
          <button className="instagram">
            <FaInstagram /> Instagram
          </button>
        </div>
      </div>
    </div>
  );
}
