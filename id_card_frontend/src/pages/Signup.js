import React, { useState } from "react";
import { signupUser } from "../api";

// PUBLIC_INTERFACE
function Signup({ onAuth, error, setError }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [loading, setLoading] = useState(false);

  // PUBLIC_INTERFACE
  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Role is omitted; backend should assign default role if necessary.
      const data = await signupUser(form.email, form.password, undefined, form.name);
      onAuth(data.token, data.user);
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="signup-form auth-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="auth-header">
        <h2>Sign Up</h2>
      </div>
      <div>
        <label htmlFor="name">Full Name:</label>
        <input
          required
          type="text"
          id="name"
          name="name"
          value={form.name}
          autoComplete="name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          value={form.email}
          autoComplete="username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          value={form.password}
          autoComplete="new-password"
          onChange={handleChange}
        />
      </div>
      {error && <div className="auth-error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}

export default Signup;
