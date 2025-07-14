import React from "react";
import "./Navbar.css";

// PUBLIC_INTERFACE
function Navbar({ user, onLogout, theme, toggleTheme }) {
  // user: {name, role}, or null

  return (
    <nav className="navbar">
      <div className="navbar-brand">Digital ID Manager</div>
      <div className="navbar-links">
        {user && (
          <>
            {(user.role === "admin" || user.role === "user") && (
              <a href="/dashboard">Dashboard</a>
            )}
            {(user.role === "admin" || user.role === "holder") && (
              <a href="/idcards">ID Cards</a>
            )}
            {user.role === "admin" && <a href="/users">Users</a>}
          </>
        )}
        {!user && (
          <>
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
          </>
        )}
      </div>
      <div className="navbar-actions">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {user && (
          <span className="navbar-user">
            {user.name} ({user.role})
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
