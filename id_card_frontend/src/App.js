import React, { useState, useEffect } from "react";
import "./App.css";
import "./pages/AuthForms.css";
import "./pages/DashboardPages.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import IdCards from "./pages/IdCards";
import Users from "./pages/Users";
import Display from "./pages/Display";
import { fetchProfile } from "./api";

// Fallback NAIVE ROUTER, since react-router-dom is not a dependency in package.json
function usePath() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  // Helper to navigate programmatically
  function go(to) {
    window.history.pushState({}, "", to);
    setPath(to);
  }
  return [path, go];
}

function getPageFromPath(path) {
  // e.g. /display/:id
  if (path.startsWith("/display/")) return { page: "display", id: path.split("/").pop() };
  if (path === "/" || path === "/dashboard") return { page: "dashboard" };
  if (path === "/login") return { page: "login" };
  if (path === "/signup") return { page: "signup" };
  if (path === "/idcards") return { page: "idcards" };
  if (path === "/users") return { page: "users" };
  return { page: "404" };
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem("user");
    return s ? JSON.parse(s) : null;
  });
  const [authError, setAuthError] = useState(null);

  const [path, go] = usePath();

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

  // On token change, refresh user profile if needed
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    async function getProfile() {
      if (!token) return setUser(null);
      try {
        const result = await fetchProfile(token);
        setUser(result);
        localStorage.setItem("user", JSON.stringify(result));
      } catch {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    if (token && !user) getProfile();
    // eslint-disable-next-line
  }, [token]);

  // PUBLIC_INTERFACE
  function handleAuth(token, user) {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    go("/dashboard");
  }

  // PUBLIC_INTERFACE
  function handleLogout() {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    go("/login");
  }

  const { page, id } = getPageFromPath(path);

  // Restrict access to pages based on roles
  const isAuthenticated = !!user && !!token;
  let PageComponent = null;
  if (page === "dashboard") PageComponent = <Dashboard user={user} />;
  else if (page === "login") PageComponent = <Login onAuth={handleAuth} error={authError} setError={setAuthError} />;
  else if (page === "signup") PageComponent = <Signup onAuth={handleAuth} error={authError} setError={setAuthError} />;
  else if (page === "idcards" && isAuthenticated) PageComponent = <IdCards token={token} user={user} />;
  else if (page === "users" && isAuthenticated) PageComponent = <Users token={token} />;
  else if (page === "display" && id) PageComponent = <Display id={id} />;
  else if (page === "404") PageComponent = <div style={{ textAlign: "center", marginTop: 50 }}>404 Not Found</div>;
  else PageComponent = <div style={{ textAlign: "center", marginTop: 50 }}>Please login to continue.</div>;

  function onNav(e) {
    const target = e.target.closest("a[href]");
    if (!target) return;
    if (target.origin === window.location.origin) {
      e.preventDefault();
      go(target.pathname);
    }
  }

  return (
    <div className="App" data-theme={theme}>
      <Navbar
        user={user}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main style={{ padding: "1.6rem" }} onClick={onNav}>
        {PageComponent}
      </main>
    </div>
  );
}

export default App;
