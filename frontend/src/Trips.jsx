import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Trips() {
    const [trips, setTrips] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [newTrip, setNewTrip] = useState({
        id: "",
        destination: "",
        duration: "",
        agencyId: "",
        imageUrl: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchTrips();
        fetchAgencies();
    }, []);

    const fetchTrips = () => {
        fetch("http://localhost:3000/trips")
            .then(res => res.json())
            .then(data => setTrips(data))
            .catch(err => console.error(err));
    };

    const fetchAgencies = () => {
        fetch("http://localhost:3000/agencies")
            .then(res => res.json())
            .then(data => setAgencies(data))
            .catch(err => console.error(err));
    };

    const addTrip = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/trips", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTrip)
        })
            .then(res => res.json())
            .then(() => {
                setNewTrip({
                    id: "",
                    destination: "",
                    duration: "",
                    agencyId: "",
                    imageUrl: ""
                });
                fetchTrips();
            })
            .catch(err => console.error(err));
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#f1f8ff", minHeight: "100vh" }}>
            <h1>Putovanja</h1>

            {/* Navigacija */}
            <div style={{ marginBottom: "15px" }}>
                <button onClick={() => navigate("/")}>🏠 Početna</button>
                <button onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
                    ⬅ Nazad
                </button>
            </div>

            {/* Forma */}
            <form onSubmit={addTrip} style={styles.form}>
                <h3>Dodaj putovanje</h3>

                <input
                    placeholder="ID"
                    value={newTrip.id}
                    onChange={e => setNewTrip({ ...newTrip, id: e.target.value })}
                    required
                />

                <input
                    placeholder="Destinacija"
                    value={newTrip.destination}
                    onChange={e => setNewTrip({ ...newTrip, destination: e.target.value })}
                    required
                />

                <input
                    type="number"
                    placeholder="Trajanje (dani)"
                    value={newTrip.duration}
                    onChange={e => setNewTrip({ ...newTrip, duration: e.target.value })}
                    required
                />

                <select
                    value={newTrip.agencyId}
                    onChange={e => setNewTrip({ ...newTrip, agencyId: e.target.value })}
                    required
                >
                    <option value="">-- Izaberi agenciju --</option>
                    {agencies.map(a => (
                        <option key={a.id} value={a.id}>
                            {a.name}
                        </option>
                    ))}
                </select>

                <input
                    placeholder="Image URL"
                    value={newTrip.imageUrl}
                    onChange={e => setNewTrip({ ...newTrip, imageUrl: e.target.value })}
                />

                <button type="submit">Dodaj putovanje</button>
            </form>

            {/* Lista */}
            <div style={styles.grid}>
                {trips.map(trip => (
                    <div key={trip.id} style={styles.card}>
                        {trip.imageUrl && (
                            <img
                                src={trip.imageUrl}
                                alt={trip.destination}
                                style={styles.image}
                            />
                        )}
                        <h3>{trip.destination}</h3>
                        <p>Trajanje: {trip.duration} dana</p>
                        <p>Agencija ID: {trip.agencyId}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    form: {
        backgroundColor: "#fff",
        padding: "12px",
        borderRadius: "8px",
        maxWidth: "320px",
        marginBottom: "20px"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "15px"
    },
    card: {
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    },
    image: {
        width: "100%",
        height: "160px",
        objectFit: "cover",
        borderRadius: "8px"
    }
};

export default Trips;
