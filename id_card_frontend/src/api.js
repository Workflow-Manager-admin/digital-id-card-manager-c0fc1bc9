//
// DIGITAL ID CARD MANAGER FRONTEND - API CONNECTION LOGIC
//
// Handles communication with the backend REST API for authentication and ID card management.
//

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Point to backend

// Helper to handle HTTP requests and parse/raise errors
async function request(path, method = "GET", data = null, auth = null) {
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (auth) opts.headers["Authorization"] = `Bearer ${auth}`;
  if (data) opts.body = JSON.stringify(data);

  const res = await fetch(`${API_BASE_URL}${path}`, opts);
  if (!res.ok) {
    let err;
    try {
      err = await res.json();
    } catch {
      err = { message: res.statusText, code: res.status };
    }
    throw err;
  }
  if (res.status !== 204) {
    return res.json();
  }
  return {};
}

// PUBLIC_INTERFACE
export async function loginUser(email, password) {
  /** Log in a user, returns { token, user } */
  return request("/auth/login", "POST", { email, password });
}

// PUBLIC_INTERFACE
export async function signupUser(email, password, role, name) {
  /** Sign up a user, returns { token, user } */
  return request("/auth/signup", "POST", { email, password, role, name });
}

// PUBLIC_INTERFACE
export async function fetchProfile(token) {
  /** Get the logged-in user's profile. */
  return request("/profile", "GET", null, token);
}

// PUBLIC_INTERFACE
export async function listIdCards(token) {
  /** List all digital ID cards (admin: all, holder: own, user: visible subset). */
  return request("/idcards", "GET", null, token);
}

// PUBLIC_INTERFACE
export async function getIdCard(id, token) {
  /** Get details for a single card. */
  return request(`/idcards/${id}`, "GET", null, token);
}

// PUBLIC_INTERFACE
export async function createIdCard(data, token) {
  /** Create a new digital ID card for a HOLDER. */
  return request("/idcards", "POST", data, token);
}

// PUBLIC_INTERFACE
export async function updateIdCard(id, data, token) {
  /** Edit/update digital ID card. */
  return request(`/idcards/${id}`, "PUT", data, token);
}

// PUBLIC_INTERFACE
export async function deleteIdCard(id, token) {
  /** Delete a digital ID card. */
  return request(`/idcards/${id}`, "DELETE", null, token);
}

// PUBLIC_INTERFACE
export async function listUsers(token) {
  /** List users (admin only) */
  return request("/users", "GET", null, token);
}
