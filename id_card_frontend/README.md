# Digital ID Card Manager – Frontend (React)

This is the React-based frontend for managing digital ID cards, featuring user signup/login, card CRUD, card-linking flows, and full REST API integration.

_All users operate with full CRUD after authentication (no roles/RBAC enforced in frontend)._

---

## 🚀 Quickstart

```bash
npm install
cp .env.example .env          # Edit backend URL
npm start
```

App runs at [http://localhost:3000](http://localhost:3000).

---

## 🌎 Environment Variables

See `.env.example` for how to configure environment variables.

- Edit `.env` to configure the backend API URL.
- Typical development setting:

```
REACT_APP_API_URL=http://localhost:5000
```

| Variable              | Purpose                       | Example                      |
|-----------------------|-------------------------------|------------------------------|
| REACT_APP_API_URL     | Base URL to backend API       | http://localhost:5000        |

---

## 🏗️ App File Structure

- `src/App.js`: Core Application and Router
- `src/api.js`: API Calls, all auth/card/user/holder endpoints
- `src/pages/Login.js` / `Signup.js`: Authentication forms
- `src/pages/IdCards.js`: Full ID Card CRUD UI
- `src/pages/Dashboard.js`: App landing page after login
- `src/pages/Users.js`: User profile listing
- `src/pages/Display.js`: Digital card public view
- `src/components/Navbar.js`: Navigation and theming

---

## ✨ Main Features

- **Signup/Login:** JWT authentication to backend (`/auth/login`, `/auth/signup`)
- **Digital ID Card CRUD:** Create, edit, delete, and view cards
- **Linking:** Digital ID cards can be associated (linked) to holders
- **Users & Holders:** List of users and holders for linking/searching
- **Responsive UI:** Fully mobile-friendly with modern design and dark mode

---

## 🔗 API Integration

All calls are made to `${REACT_APP_API_URL}`. Backend API spec endpoints:

- `POST   /auth/login` – User login
- `POST   /auth/signup` – User signup
- `GET    /idcards` – List digital ID cards
- `POST   /idcards` – Create new ID card
- `GET    /idcards/:id` – Get an ID card
- `PUT    /idcards/:id` – Update an ID card
- `DELETE /idcards/:id` – Delete an ID card
- `POST   /idcards/link` – Link card to holder
- `GET    /users` – List users
- `GET    /holders` – List holders

_All requests use JWT bearer token (Authorization header) if authenticated._

---

## 📲 Usage Flow

1. Register or login (email & password)
2. Manage (create/update/delete) digital ID cards after login
3. Link ID cards to users/holders (if required by backend logic)
4. View all registered users and holders
5. Display/share digital ID card via direct link

---

## Testing

```bash
npm test
```

---

## 🔒 Auth

- JWT token stored in `localStorage`
- Added to every API request via `Authorization: Bearer ...`

---

## Development Notes

- All navigation is client-side, no page reloads
- Update endpoint URLs (`src/api.js`) as backend evolves

---

## Full Stack Integration

- Backend and DB must be running per their (README)
- This frontend expects an OpenAPI-compliant backend (see above)

---
