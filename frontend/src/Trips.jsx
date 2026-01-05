import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Trips() {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    const fetchTrips = async () => {
        try {
            const res = await axios.get("http://localhost:3000/trips");
            setTrips(res.data);
        } catch (err) {
            console.error("Greška pri dohvaćanju putovanja:", err);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Putovanja</h1>

            {/* Dugmad */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <button onClick={() => navigate("/")}>🏠 Početna</button>
                <button onClick={() => navigate(-1)}>⬅ Nazad</button>
            </div>

            {/* Kartice */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "15px"
                }}
            >
                {trips.map((trip) => (
                    <div
                        key={trip.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
                        }}
                    >
                        {/* Slika */}
                        {trip.imageUrl && (
                            <img
                                src={trip.imageUrl}
                                alt={trip.destination}
                                style={{
                                    width: "100%",
                                    height: "160px",
                                    objectFit: "cover"
                                }}
                            />
                        )}

                        <div style={{ padding: "12px" }}>
                            <h3 style={{ margin: 0 }}>{trip.destination}</h3>
                            <p style={{ margin: "6px 0" }}>Trajanje: {trip.duration} dana</p>
                            <p style={{ margin: "6px 0" }}>Agencija ID: {trip.agencyId}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Trips;
