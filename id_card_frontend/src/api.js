// DIGITAL ID CARD MANAGER FRONTEND - API CONNECTION LOGIC

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Core request handler: attaches auth, raises on error, parses JSON
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
  // 204 No Content
  if (res.status !== 204) {
    return res.json();
  }
  return {};
}

// PUBLIC_INTERFACE
export async function loginUser(email, password) {
  // POST /auth/login with {email, password} (backend expects)
  return request("/auth/login", "POST", { email, password });
}

// PUBLIC_INTERFACE
export async function signupUser(email, password, _role, name) {
  // POST /auth/signup, ignore _role and optional name for now
  return request("/auth/signup", "POST", { username: email, password });
}

// PUBLIC_INTERFACE
export async function fetchProfile(token) {
  // Allow GET /profile (if backend supports) or fallback (not spec'd)
  return request("/profile", "GET", null, token);
}

// PUBLIC_INTERFACE
export async function listIdCards(token) {
  // GET /idcards
  return request("/idcards", "GET", null, token);
}

// PUBLIC_INTERFACE
export async function getIdCard(id, token) {
  // GET /idcards/:id (numeric)
  return request(`/idcards/${id}`, "GET", null, token);
}

// PUBLIC_INTERFACE
export async function createIdCard(data, token) {
  // POST /idcards
  return request("/idcards", "POST", data, token);
}

// PUBLIC_INTERFACE
export async function updateIdCard(id, data, token) {
  // PUT /idcards/:id
  return request(`/idcards/${id}`, "PUT", data, token);
}

// PUBLIC_INTERFACE
export async function deleteIdCard(id, token) {
  // DELETE /idcards/:id
  return request(`/idcards/${id}`, "DELETE", null, token);
}

// PUBLIC_INTERFACE
export async function listUsers(token) {
  // GET /users (even if not explicit in spec)
  return request("/users", "GET", null, token);
}

// PUBLIC_INTERFACE
export async function linkIdCardToHolder(holder_id, idcard_id, token) {
  // POST /idcards/link with {holder_id, idcard_id}
  return request("/idcards/link", "POST", { holder_id, idcard_id }, token);
}

// PUBLIC_INTERFACE
export async function listHolders(token) {
  // GET /holders
  return request("/holders", "GET", null, token);
}
