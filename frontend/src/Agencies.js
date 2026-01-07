import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Agencies() {
    const [agencies, setAgencies] = useState([]);
    const navigate = useNavigate();

    const fetchAgencies = async () => {
        try {
            const res = await axios.get("http://localhost:3000/agencies");
            setAgencies(res.data);
        } catch (err) {
            console.error("Greška pri dohvaćanju agencija:", err);
        }
    };

    useEffect(() => {
        fetchAgencies();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Agencije</h1>

            {/* Dugmad */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <button onClick={() => navigate("/")}>🏠 Početna</button>
                <button onClick={() => navigate(-1)}>⬅ Nazad</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "15px" }}>
                {agencies.map((agency) => (
                    <div
                        key={agency.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            padding: "15px",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h3 style={{ marginTop: 0 }}>{agency.name}</h3>
                        <p style={{ margin: "6px 0" }}>Lokacija: {agency.location}</p>
                        <p style={{ margin: "6px 0" }}>ID: {agency.id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Agencies;
