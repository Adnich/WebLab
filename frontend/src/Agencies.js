import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Agencies() {
  const [agencies, setAgencies] = useState([]);
  const [newAgency, setNewAgency] = useState({ id: "", name: "", location: "" });
  const [editingAgency, setEditingAgency] = useState(null);
  const [agencyTrips, setAgencyTrips] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = () => {
    fetch("http://localhost:3000/agencies")
      .then((res) => res.json())
      .then((data) => setAgencies(data))
      .catch((err) => console.error(err));
  };

  const addAgency = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/agencies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAgency),
    })
      .then((res) => res.json())
      .then(() => {
        setNewAgency({ id: "", name: "", location: "" });
        fetchAgencies();
      })
      .catch((err) => console.error(err));
  };

  const startEditing = (agency) => setEditingAgency(agency);

  const updateAgency = (e) => {
    e.preventDefault();
    if (!editingAgency) return;

    fetch(`http://localhost:3000/agencies/${editingAgency.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingAgency),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingAgency(null);
        fetchAgencies();
      })
      .catch((err) => console.error(err));
  };

  const deleteAgency = (id) => {
    if (!window.confirm("Jeste li sigurni da želite obrisati agenciju?")) return;

    fetch(`http://localhost:3000/agencies/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => fetchAgencies())
      .catch((err) => console.error(err));
  };

  const fetchAgencyTrips = (agencyId) => {
    fetch(`http://localhost:3000/agencies/${agencyId}/trips`)
      .then((res) => res.json())
      .then((data) => {
        setAgencyTrips((prev) => ({
          ...prev,
          [agencyId]: data,
        }));
      })
      .catch((err) => console.error(err));
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
      {/* bijeli overlay (isti kao Travelers) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.70)",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h1 className="page-title">Agencije</h1>

        {/* NAV dugmad (isti fazon kao na slici) */}
        <div className="nav-bar">
          <button className="nav-btn" onClick={() => navigate("/")}>
            🏠 Početna
          </button>
          <button className="nav-btn" onClick={() => navigate(-1)}>
            ← Nazad
          </button>
        </div>

        {/* ADD FORM (centar kartica) */}
        <div className="card form-card" style={{ textAlign: "left" }}>
          <h3>Dodaj agenciju</h3>

          <form onSubmit={addAgency}>
            <input
              placeholder="ID"
              value={newAgency.id}
              onChange={(e) => setNewAgency({ ...newAgency, id: e.target.value })}
              required
            />
            <input
              placeholder="Naziv"
              value={newAgency.name}
              onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
              required
            />
            <input
              placeholder="Lokacija"
              value={newAgency.location}
              onChange={(e) =>
                setNewAgency({ ...newAgency, location: e.target.value })
              }
              required
            />

            <button className="btn-primary" type="submit">
              Dodaj
            </button>
          </form>
        </div>

        {/* EDIT FORM (kad klikne Edit) */}
        {editingAgency && (
          <div className="card form-card" style={{ textAlign: "left" }}>
            <h3>Uredi agenciju</h3>
            <p>
              <b>ID:</b> {editingAgency.id}
            </p>

            <form onSubmit={updateAgency}>
              <input
                placeholder="Naziv"
                value={editingAgency.name}
                onChange={(e) =>
                  setEditingAgency({ ...editingAgency, name: e.target.value })
                }
                required
              />
              <input
                placeholder="Lokacija"
                value={editingAgency.location}
                onChange={(e) =>
                  setEditingAgency({ ...editingAgency, location: e.target.value })
                }
                required
              />

              <button className="btn-primary" type="submit">
                Sačuvaj
              </button>
              <button
                className="btn-danger"
                type="button"
                onClick={() => setEditingAgency(null)}
              >
                Odustani
              </button>
            </form>
          </div>
        )}

        {/* LISTA (široka kartica + TABELA kao što tražiš) */}
        <div className="card table-card" style={{ textAlign: "left" }}>
          <h3>Lista agencija</h3>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>Lokacija</th>
                <th>Akcije</th>
              </tr>
            </thead>

            <tbody>
              {agencies.length === 0 ? (
                <tr>
                  <td colSpan="4">Nema upisanih agencija</td>
                </tr>
              ) : (
                agencies.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.name}</td>
                    <td>{a.location}</td>

                    <td>
                      <button className="btn-small" onClick={() => startEditing(a)}>
                        Edit
                      </button>

                      <button
                        className="btn-small danger"
                        onClick={() => deleteAgency(a.id)}
                      >
                        Obriši
                      </button>

                      <button
                        className="btn-small info"
                        onClick={() => fetchAgencyTrips(a.id)}
                      >
                        Prikaži putovanja
                      </button>

                      {/* putovanja ostaju tu (kao prije), samo ljepši prikaz */}
                      {agencyTrips[a.id] && (
                        <ul className="mini-list">
                          {agencyTrips[a.id].length === 0 ? (
                            <li>Nema putovanja</li>
                          ) : (
                            agencyTrips[a.id].map((trip) => (
                              <li key={trip.id}>
                                {trip.destination} ({trip.duration} dana)
                              </li>
                            ))
                          )}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
