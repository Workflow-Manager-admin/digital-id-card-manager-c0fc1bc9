import React from "react";

// PUBLIC_INTERFACE
function Dashboard({ user }) {
  // user: {name, role}

  return (
    <div className="dashboard">
      <h1>Welcome{user ? `, ${user.name}` : ""}!</h1>
      <div>
        {user && user.role === "admin" && (
          <p>You manage all users and digital ID cards. Go to "Users" to add or modify users, or "ID Cards" to manage all cards.</p>
        )}
        {user && user.role === "user" && (
          <p>You can view and verify digital ID cards and lookup holder info.</p>
        )}
        {user && user.role === "holder" && (
          <p>You can create and manage your own digital ID card, check status, and display your QR code for verification.</p>
        )}
        {!user && <p>Please login to access the application dashboard.</p>}
      </div>
    </div>
  );
}

export default Dashboard;
