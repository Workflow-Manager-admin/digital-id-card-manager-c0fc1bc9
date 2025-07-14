# Digital ID Card Manager – Frontend (React)

This React frontend enables users to register, log in, and manage digital ID cards. All user flows are role-agnostic—after login/signup, users may create, update, view, or delete digital ID cards and view all user profiles.

> **Note:** There are _no user roles/RBAC_: after authentication, all users see and access the same UI and functions.

---

## 🛠 Quickstart

```bash
npm install
cp .env.example .env   # Set your backend URL in .env
npm start
```
Runs at [http://localhost:3000](http://localhost:3000).

---

## 🌎 Environment Variables

Edit `.env` in this folder for backend config:

| Variable              | Purpose                            | Example                       |
|-----------------------|------------------------------------|-------------------------------|
| REACT_APP_API_URL     | Base URL to Flask backend API      | http://localhost:5000         |

API calls are made to `${REACT_APP_API_URL}` (see `src/api.js`).

#### Example `.env`
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🏗️ Application Structure

- **Core App**: `src/App.js`
- **API Logic/Endpoints**: `src/api.js`
- **Login/Signup**: `src/pages/Login.js`, `src/pages/Signup.js`
- **Dashboard**: `src/pages/Dashboard.js`
- **ID Card Management**: `src/pages/IdCards.js`, `src/pages/Display.js`
- **User List**: `src/pages/Users.js`
- **Navbar/Navigation**: `src/components/Navbar.js`

---

## ✨ Main Features

- User **sign up/login** (JWT-based authentication)
- **CRUD** for Digital ID Cards: create, edit, delete, and display as digital card
- View all users
- **ID Card Linking & Uniqueness**: Each card has a unique identifier, and is linkable to a profile
- Responsive, modern, minimal UI
- All API calls are secured with JWT via Authorization header

---

## 🔗 Backend API Integration

Endpoints used (see backend OpenAPI spec):

- `POST   /auth/login` – User login
- `POST   /auth/signup` – User signup
- `GET    /idcards` – List digital ID cards
- `POST   /idcards` – Create new ID card
- `GET    /idcards/:id` – Get an ID card
- `PUT    /idcards/:id` – Update an ID card
- `DELETE /idcards/:id` – Delete an ID card
- `GET    /users` – List all users
- (Also: `/holders`, `/idcards/link` for unique linking logic)

---

## 🧑‍💻 Development

- Update API endpoint URLs in `src/api.js` only if backend changes (matches Flask OpenAPI spec).
- UI: modify `src/App.css`, `src/pages/*.css`, or components as desired.

---

## 📲 Usage Flow

1. **Register / Login** (Email and password only)
2. Manage your digital ID cards, or view/CRUD all (based on backend logic)
3. Edit/Delete any card you own, or create new cards
4. View cards via Dashboard or directly by link (URL/shareable)

---

## 🧪 Testing

```bash
npm test
```

---

## 🔒 Authentication

- JWT tokens are stored in `localStorage`
- Sent on every request in `Authorization: Bearer ...` header

---

## 🏗️ Full Stack Integration

1. **Database**: see backend/db README for details
2. **Backend API**: must be running and accessible at `REACT_APP_API_URL`
3. **Frontend**: configure `.env`, then run with `npm start`

---

## 📃 Further Docs

- For backend/database configuration and schema, see their respective READMEs.

---
