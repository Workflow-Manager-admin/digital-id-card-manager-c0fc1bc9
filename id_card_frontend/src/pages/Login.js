import React, { useState } from "react";
import { loginUser } from "../api";

// PUBLIC_INTERFACE
function Login({ onAuth, error, setError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      onAuth(data.token, data.user);
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-form auth-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="auth-header">
        <h2>Login</h2>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          required
          autoFocus
          id="email"
          type="email"
          value={email}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          required
          id="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="auth-error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}

export default Login;
