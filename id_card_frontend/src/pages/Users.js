import React, { useEffect, useState } from "react";
import { listUsers } from "../api";

// PUBLIC_INTERFACE
function Users({ token }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetch() {
      setError(null);
      try {
        setUsers(await listUsers(token));
      } catch (err) {
        setError(err?.message || "Failed to list users.");
      }
    }
    fetch();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="users-page">
      <h2>All Users</h2>
      {error && <div className="auth-error">{error}</div>}
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {(users || []).map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
