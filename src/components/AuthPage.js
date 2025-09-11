import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./Auth.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // for user only
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");

  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!email || !password) {
      setMessage("Credentials cannot be empty");
      setMessageColor("red");
      return;
    }

    try {
      if (isLogin) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const token = await cred.user.getIdToken();
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ email: cred.user.email, role: "user" }));
        setMessage("Login successful!");
        setMessageColor("green");
        navigate("/user");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Signup successful! Please login now.");
        setMessageColor("green");
        setIsLogin(true);
      }
    } catch (e) {
      setMessage(e.message || "Authentication failed");
      setMessageColor("red");
    }

    setEmail("");
    setPassword("");
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email: user.email, role: "user" }));
      setMessage("Login successful!");
      setMessageColor("green");
      navigate("/user");
    } catch (e) {
      setMessage(e.message || "Google sign-in failed");
      setMessageColor("red");
    }
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
        <div className="social-login">
          <button className="google" onClick={handleGoogle}>Continue with Google</button>
        </div>

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
