import React, { useEffect, useState } from "react";
import {
  listIdCards,
  createIdCard,
  deleteIdCard,
  updateIdCard,
  getIdCard
} from "../api";

// PUBLIC_INTERFACE
function IdCards({ token, user }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [error, setError] = useState(null);

  // PUBLIC_INTERFACE
  async function fetchCards() {
    setLoading(true);
    setError(null);
    try {
      const list = await listIdCards(token);
      setCards(list);
    } catch (err) {
      setError(err?.message || "Could not fetch ID cards.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCards();
    // eslint-disable-next-line
  }, []);

  // PUBLIC_INTERFACE
  function handleCreate() {
    setShowForm(true);
    setEditCard(null);
  }

  // PUBLIC_INTERFACE
  function handleEdit(card) {
    setEditCard(card);
    setShowForm(true);
  }

  // PUBLIC_INTERFACE
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this ID card?")) return;
    try {
      await deleteIdCard(id, token);
      fetchCards();
    } catch (err) {
      setError(err?.message || "Delete failed.");
    }
  }

  // PUBLIC_INTERFACE
  function handleCloseForm() {
    setShowForm(false);
    setEditCard(null);
  }

  // PUBLIC_INTERFACE
  async function handleSave(cardData) {
    try {
      if (editCard) {
        await updateIdCard(editCard.id, cardData, token);
      } else {
        await createIdCard(cardData, token);
      }
      handleCloseForm();
      fetchCards();
    } catch (err) {
      setError(err?.message || "Save failed.");
    }
  }

  return (
    <div className="idcards-page">
      <h2>Digital ID Cards</h2>
      <div style={{ textAlign: "right", marginBottom: "0.5rem" }}>
        {user && (
          <button className="btn" onClick={handleCreate}>
            + New ID Card
          </button>
        )}
      </div>
      {error && <div className="auth-error">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="cards-list">
          {cards.length === 0 && <p>No ID cards found.</p>}
          {cards.map(card => (
            <div className="card-box" key={card.id}>
              <strong>{card.name}</strong>
              <div>ID Number: <span>{card.unique_number}</span></div>
              <div>Email: {card.email}</div>
              {/* Remove role display */}
              <div className="card-actions">
                <button onClick={() => window.open(`/display/${card.id}`, "_blank")}>View</button>
                {/* All users may edit/delete their cards, else edit/delete is shown for now */}
                {(user && (user.id === card.user_id)) && (
                  <>
                    <button onClick={() => handleEdit(card)}>Edit</button>
                    <button onClick={() => handleDelete(card.id)} style={{ color: "#D32F2F" }}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <IdCardForm
          onClose={handleCloseForm}
          onSave={handleSave}
          card={editCard}
        />
      )}
    </div>
  );
}

// ID Card Create/Edit Form
function IdCardForm({ onClose, onSave, card }) {
  const [form, setForm] = useState(
    card || {
      name: "",
      unique_number: "",
      email: "",
      address: "",
      expiry: "",
      metadata: "",
    }
  );

  // PUBLIC_INTERFACE
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmit}>
          <h3>{card ? "Edit ID Card" : "New ID Card"}</h3>
          <label>
            Name:
            <input name="name" required value={form.name} onChange={handleChange} />
          </label>
          <label>
            ID Number:
            <input name="unique_number" required value={form.unique_number} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input name="email" required type="email" value={form.email} onChange={handleChange} />
          </label>
          <label>
            Address:
            <input name="address" value={form.address} onChange={handleChange} />
          </label>
          <label>
            Expiry:
            <input name="expiry" type="date" value={form.expiry} onChange={handleChange} />
          </label>
          <label>
            Additional Info:
            <input name="metadata" value={form.metadata} onChange={handleChange} />
          </label>
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" className="secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IdCards;
