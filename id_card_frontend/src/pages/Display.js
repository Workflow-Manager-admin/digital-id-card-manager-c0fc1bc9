import React, { useEffect, useState } from "react";
import { getIdCard } from "../api";

// PUBLIC_INTERFACE
function Display({ id }) {
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetch() {
      setError(null);
      try {
        setCard(await getIdCard(id));
      } catch (err) {
        setError(err?.message || "Not found");
      }
    }
    fetch();
    // eslint-disable-next-line
  }, [id]);

  if (error)
    return (
      <div className="idcard-display">
        <h3>Error: {error}</h3>
      </div>
    );

  if (!card) return <div className="idcard-display">Loading...</div>;

  return (
    <div className="idcard-display">
      <div className="idcard">
        <div className="idcard-title">Digital ID Card</div>
        <div className="idcard-row">Name: <b>{card.name}</b></div>
        <div className="idcard-row">ID Number: {card.unique_number}</div>
        <div className="idcard-row">Email: {card.email}</div>
        <div className="idcard-row">Address: {card.address}</div>
        <div className="idcard-row">Expiry: {card.expiry}</div>
        <div className="idcard-row">Metadata: {card.metadata}</div>
        {/* Placeholder for QR code, etc. */}
      </div>
    </div>
  );
}

export default Display;
