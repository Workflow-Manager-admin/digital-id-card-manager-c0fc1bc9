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

  const expired =
    card.expiry && new Date(card.expiry) < new Date();

  return (
    <div className="idcard-display">
      <div
        className="idcard"
        style={{
          border: `2.5px solid ${expired ? "#d32f2f" : "#1976D2"}`,
          background:
            "linear-gradient(120deg, var(--bg-primary) 70%, #fafafa 100%)",
        }}
      >
        <div
          className="idcard-title"
          style={{
            marginBottom: "0.8rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Digital ID Card
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: expired ? "#d32f2f" : "#1976D2",
              marginLeft: 7,
            }}
          >
            {expired ? "EXPIRED" : card.status === "active" ? "ACTIVE" : ""}
          </span>
        </div>

        <div className="idcard-row">
          <b>Name:</b> {card.name}
        </div>
        <div className="idcard-row">
          <b>ID Number:</b> {card.unique_number}
        </div>
        <div className="idcard-row">
          <b>Email:</b> {card.email}
        </div>
        <div className="idcard-row">
          <b>Address:</b> {card.address}
        </div>
        <div className="idcard-row">
          <b>Expiry:</b>{" "}
          {card.expiry
            ? new Date(card.expiry).toLocaleDateString()
            : "N/A"}
        </div>
        {card.metadata && card.metadata.trim() && (
          <div className="idcard-row">
            <b>Notes:</b> {card.metadata}
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: 14 }}>
          {/* Placeholder for QR code/future badges */}
          <span style={{ color: "#1976D2", fontWeight: 600, fontSize: 13 }}>
            {card.role && `Role: ${card.role.toUpperCase()}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Display;
