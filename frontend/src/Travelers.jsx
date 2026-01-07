import React, { useEffect, useState } from "react";
import "./App.css";

export default function Travelers() {
  const [travelers, setTravelers] = useState([]);
  const [newTraveler, setNewTraveler] = useState({ id: "", name: "", age: "" });
  const [editingTraveler, setEditingTraveler] = useState(null);

  useEffect(() => {
    fetchTravelers();
  }, []);

  const fetchTravelers = () => {
    fetch("http://localhost:3000/travelers")
      .then((res) => res.json())
      .then((data) => setTravelers(data))
      .catch((err) => console.error("Error:", err));
  };

  const addTraveler = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/travelers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTraveler),
    })
      .then((res) => res.json())
      .then(() => {
        setNewTraveler({ id: "", name: "", age: "" });
        fetchTravelers();
      })
      .catch((err) => console.error("Error:", err));
  };

  const startEditing = (traveler) => setEditingTraveler(traveler);

  const updateTraveler = (e) => {
    e.preventDefault();
    if (!editingTraveler) return;

    fetch(`http://localhost:3000/travelers/${editingTraveler.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingTraveler),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingTraveler(null);
        fetchTravelers();
      })
      .catch((err) => console.error("Error:", err));
  };

  const deleteTraveler = (id) => {
    fetch(`http://localhost:3000/travelers/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => fetchTravelers())
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div
      className="page"
      style={{
        backgroundImage: "url(/planes.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* bijeli overlay kao na Home */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.70)",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h1 className="page-title">Travelers</h1>

        {/* ADD FORM (centar kartica) */}
        <div className="card form-card" style={{ textAlign: "left" }}>
          <h3>Dodaj novog Traveler-a</h3>

          <form onSubmit={addTraveler}>
            <input
              type="text"
              placeholder="ID"
              value={newTraveler.id}
              onChange={(e) =>
                setNewTraveler({ ...newTraveler, id: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Ime"
              value={newTraveler.name}
              onChange={(e) =>
                setNewTraveler({ ...newTraveler, name: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Godine"
              value={newTraveler.age}
              onChange={(e) =>
                setNewTraveler({ ...newTraveler, age: e.target.value })
              }
              required
            />

            <button className="btn-primary" type="submit">
              Dodaj
            </button>
          </form>
        </div>

        {/* EDIT FORM (isto kao add, kad klikne Edit) */}
        {editingTraveler && (
          <div className="card form-card" style={{ textAlign: "left" }}>
            <h3>Ažuriraj Traveler-a</h3>
            <p>
              <b>ID:</b> {editingTraveler.id}
            </p>

            <form onSubmit={updateTraveler}>
              <input
                type="text"
                placeholder="Ime"
                value={editingTraveler.name}
                onChange={(e) =>
                  setEditingTraveler({
                    ...editingTraveler,
                    name: e.target.value,
                  })
                }
                required
              />
              <input
                type="number"
                placeholder="Godine"
                value={editingTraveler.age}
                onChange={(e) =>
                  setEditingTraveler({
                    ...editingTraveler,
                    age: e.target.value,
                  })
                }
                required
              />

              <button className="btn-primary" type="submit">
                Sačuvaj
              </button>
              <button
                className="btn-danger"
                type="button"
                onClick={() => setEditingTraveler(null)}
              >
                Odustani
              </button>
            </form>
          </div>
        )}

        {/* LISTA (široka kartica ispod) */}
        <div className="card table-card" style={{ textAlign: "left" }}>
          <h3>Lista Traveler-a</h3>

          {travelers.length === 0 ? (
            <p>Nema upisanih traveler-a</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ime</th>
                  <th>Godine</th>
                  <th>Akcije</th>
                </tr>
              </thead>
              <tbody>
                {travelers.map((trav) => (
                  <tr key={trav.id}>
                    <td>{trav.id}</td>
                    <td>{trav.name}</td>
                    <td>{trav.age}</td>
                    <td>
                      <button
                        className="btn-small"
                        onClick={() => startEditing(trav)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-small danger"
                        onClick={() => deleteTraveler(trav.id)}
                      >
                        Obriši
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
