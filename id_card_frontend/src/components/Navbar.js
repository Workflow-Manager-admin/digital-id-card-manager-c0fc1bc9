import React from "react";
import "./Navbar.css";

// PUBLIC_INTERFACE
function Navbar({ user, onLogout, theme, toggleTheme }) {
  // user: {name}, or null

  // All authenticated users see Dashboard, ID Cards, and Users links;
  // Unauthenticated users see Login/SignUp
  return (
    <nav className="navbar">
      <div className="navbar-brand">Digital ID Manager</div>
      <div className="navbar-links">
        {user ? (
          <>
            <a href="/dashboard">Dashboard</a>
            <a href="/idcards">ID Cards</a>
            <a href="/users">Users</a>
          </>
        ) : (
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
            {user.name}
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
