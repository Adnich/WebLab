import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [newTrip, setNewTrip] = useState({
    id: "",
    destination: "",
    duration: "",
    agencyId: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
    fetchAgencies();
  }, []);

  const fetchTrips = () => {
    fetch("http://localhost:3000/trips")
      .then((res) => res.json())
      .then((data) => setTrips(data))
      .catch((err) => console.error(err));
  };

  const fetchAgencies = () => {
    fetch("http://localhost:3000/agencies")
      .then((res) => res.json())
      .then((data) => setAgencies(data))
      .catch((err) => console.error(err));
  };

  const addTrip = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTrip),
    })
      .then((res) => res.json())
      .then(() => {
        setNewTrip({
          id: "",
          destination: "",
          duration: "",
          agencyId: "",
          imageUrl: "",
        });
        fetchTrips();
      })
      .catch((err) => console.error(err));
  };

  const getAgencyName = (agencyId) => {
    const a = agencies.find((x) => String(x.id) === String(agencyId));
    return a ? a.name : agencyId;
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
      {/* overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.70)",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h1 className="page-title">Putovanja</h1>

        {/* NAV */}
        <div className="nav-bar">
          <button className="nav-btn" onClick={() => navigate("/")}>
            🏠 Početna
          </button>
          <button className="nav-btn" onClick={() => navigate(-1)}>
            ← Nazad
          </button>
        </div>

        {/* FORMA */}
        <div className="card form-card" style={{ textAlign: "left" }}>
          <h3>Dodaj putovanje</h3>

          <form onSubmit={addTrip}>
            <input
              placeholder="ID"
              value={newTrip.id}
              onChange={(e) => setNewTrip({ ...newTrip, id: e.target.value })}
              required
            />

            <input
              placeholder="Destinacija"
              value={newTrip.destination}
              onChange={(e) =>
                setNewTrip({ ...newTrip, destination: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder="Trajanje (dani)"
              value={newTrip.duration}
              onChange={(e) =>
                setNewTrip({ ...newTrip, duration: e.target.value })
              }
              required
            />

            <select
              className="form-select"
              value={newTrip.agencyId}
              onChange={(e) =>
                setNewTrip({ ...newTrip, agencyId: e.target.value })
              }
              required
            >
              <option value="">-- Izaberi agenciju --</option>
              {agencies.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>

            <input
              placeholder="Image URL"
              value={newTrip.imageUrl}
              onChange={(e) =>
                setNewTrip({ ...newTrip, imageUrl: e.target.value })
              }
            />

            <button className="btn-primary" type="submit">
              Dodaj putovanje
            </button>
          </form>
        </div>

        {/* LISTA */}
        <div className="card table-card" style={{ textAlign: "left" }}>
          <h3>Lista putovanja</h3>

          {trips.length === 0 ? (
            <p>Nema upisanih putovanja</p>
          ) : (
            <div className="trips-grid">
              {trips.map((trip) => (
                <div className="trip-card" key={trip.id}>
                  {trip.imageUrl ? (
                    <img
                      src={trip.imageUrl}
                      alt={trip.destination}
                      className="trip-image"
                    />
                  ) : (
                    <div className="trip-image placeholder" />
                  )}

                  <div className="trip-body">
                    <div className="trip-title">{trip.destination}</div>
                    <div className="trip-meta">Trajanje: {trip.duration} dana</div>
                    <div className="trip-meta">
                      Agencija: {getAgencyName(trip.agencyId)}
                    </div>
                    <div className="trip-id">ID: {trip.id}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
