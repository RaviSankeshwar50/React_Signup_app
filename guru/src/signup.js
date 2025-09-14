import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError("");
    setSuccess("");

    // Validation checks
    if (!username || !gmail || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(gmail)) {
      setError("Please enter a valid Gmail address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Send signup request
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method:
        
        "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username, // backend expects "name"
          email: gmail,   // backend expects "email"
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message from backend or default
        setSuccess(data.message || "User registered successfully");

        // Clear form only on success
        setUsername("");
        setGmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        // Show backend error or default
        setError(data.message || "Signup failed!");
      }

    } catch (err) {
      setError("Error connecting to server. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ width: "300px", margin: "auto" }}>
      <h2>Signup Page</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />

        <input
          type="email"
          placeholder="Enter Gmail"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /><br /><br />

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
