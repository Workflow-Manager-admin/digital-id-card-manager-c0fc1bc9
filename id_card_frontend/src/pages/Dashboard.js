import React from "react";

// PUBLIC_INTERFACE
function Dashboard({ user }) {
  // user: {name}

  return (
    <div className="dashboard">
      <h1>Welcome{user ? `, ${user.name}` : ""}!</h1>
      <div>
        {user ? (
          <p>
            Here you can manage your Digital ID cards and view all users.
            Use the navigation bar to access Dashboard, ID Cards, and Users sections.
          </p>
        ) : (
          <p>Please login to access the application dashboard.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
