# Digital ID Card Manager – Frontend (React)

This is the React web frontend for the Digital ID Card Manager app. Users can register, log in, create/edit/view Digital ID cards, and connect with the backend REST API.

---

## 🛠 Quickstart

```bash
npm install
npm start
```
Runs at [http://localhost:3000](http://localhost:3000) by default.

---

## 🌎 Environment Variables

Configuration is done via a `.env` file in this directory.

| Variable              | Purpose                              | Example                       |
|-----------------------|--------------------------------------|-------------------------------|
| REACT_APP_API_URL     | **Base URL to Backend (Flask API)**  | http://localhost:5000         |

- Update `REACT_APP_API_URL` in `.env` to point to your backend location for both local dev and deployment.
- The variable is required for API calls (see `src/api.js`).

#### Example `.env`
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🏗️ Integration Flow

**Frontend (React) ⇄ Backend (Flask REST API) ⇄ Database (PostgreSQL)**

- All API calls are routed to the Flask backend specified by `REACT_APP_API_URL`.
- The backend URL _must_ be reachable from your browser (CORS is enabled by default in the backend).
- The backend, in turn, interacts with the PostgreSQL database using its own environment config.

**API endpoints used:**
- `/auth/login`, `/auth/signup`
- `/idcards` and related
- `/holders` etc.

Update the backend endpoint with your deployment or dev server.

---

## 👩‍💻 Development/Customization

- Edit `src/api.js` for custom endpoints or headers.
- UI styles and layout are customizable in `src/App.css` and components.

---

## 🔗 E2E Integration (Full Stack Setup)

**1. Start the Database**
- See `../digital-id-card-manager-e92f97cd/README.md` for DB setup and environment variables.

**2. Start the Backend API**
- Configure DB environment vars as in the backend README.
- Run Flask API (`python run.py` or via WSGI).

**3. Configure the Frontend**
- Set `REACT_APP_API_URL` in your `.env` file.

**4. Start the Frontend**
```
npm install
npm start
```

- Open [http://localhost:3000](http://localhost:3000)
- Sign up, log in, and test the app via the UI.

---

## 🔒 Authentication

- JWT tokens returned from the backend are stored in `localStorage` and sent with each API call as `Authorization: Bearer ...` header.

---

## 📂 Codebase Structure

- Core App: `src/App.js`
- API Logic: `src/api.js`
- Pages: `src/pages/`
- Components: `src/components/`

---

## 🧪 Testing

```bash
npm test
```

---

## 📃 Further Documentation

- See backend and db READMEs for further details on backend configuration and table schema.

---

