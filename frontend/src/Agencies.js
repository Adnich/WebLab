import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Agencies() {
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
            .then(res => res.json())
            .then(data => setAgencies(data))
            .catch(err => console.error(err));
    };

    const addAgency = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/agencies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAgency)
        })
            .then(res => res.json())
            .then(() => {
                setNewAgency({ id: "", name: "", location: "" });
                fetchAgencies();
            })
            .catch(err => console.error(err));
    };

    const startEditing = (agency) => {
        setEditingAgency(agency);
    };

    const updateAgency = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/agencies/${editingAgency.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingAgency)
        })
            .then(res => res.json())
            .then(() => {
                setEditingAgency(null);
                fetchAgencies();
            })
            .catch(err => console.error(err));
    };

    const deleteAgency = (id) => {
        if (!window.confirm("Jeste li sigurni da želite obrisati agenciju?")) return;

        fetch(`http://localhost:3000/agencies/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(() => fetchAgencies())
            .catch(err => console.error(err));
    };

    const fetchAgencyTrips = (agencyId) => {
        fetch(`http://localhost:3000/agencies/${agencyId}/trips`)
            .then(res => res.json())
            .then(data => {
                setAgencyTrips(prev => ({
                    ...prev,
                    [agencyId]: data
                }));
            })
            .catch(err => console.error(err));
    };

    return (
        <div style={styles.page}>
            <h1>Agencije</h1>

            {/* Navigacija */}
            <div style={{ marginBottom: "15px" }}>
                <button onClick={() => navigate("/")}>🏠 Početna</button>
                <button onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
                    ⬅ Nazad
                </button>
            </div>

            {/* Dodavanje */}
            <form onSubmit={addAgency} style={styles.form}>
                <h3>Dodaj agenciju</h3>
                <input
                    placeholder="ID"
                    value={newAgency.id}
                    onChange={e => setNewAgency({ ...newAgency, id: e.target.value })}
                    required
                />
                <input
                    placeholder="Naziv"
                    value={newAgency.name}
                    onChange={e => setNewAgency({ ...newAgency, name: e.target.value })}
                    required
                />
                <input
                    placeholder="Lokacija"
                    value={newAgency.location}
                    onChange={e => setNewAgency({ ...newAgency, location: e.target.value })}
                    required
                />
                <button type="submit">Dodaj</button>
            </form>

            {/* Edit */}
            {editingAgency && (
                <form onSubmit={updateAgency} style={styles.form}>
                    <h3>Uredi agenciju</h3>
                    <p>ID: {editingAgency.id}</p>
                    <input
                        value={editingAgency.name}
                        onChange={e => setEditingAgency({ ...editingAgency, name: e.target.value })}
                        required
                    />
                    <input
                        value={editingAgency.location}
                        onChange={e => setEditingAgency({ ...editingAgency, location: e.target.value })}
                        required
                    />
                    <button type="submit">Sačuvaj</button>
                    <button
                        type="button"
                        onClick={() => setEditingAgency(null)}
                        style={{ marginLeft: "10px" }}
                    >
                        Odustani
                    </button>
                </form>
            )}

            {/* Lista */}
            <table style={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Naziv</th>
                    <th>Lokacija</th>
                    <th>Akcije</th>
                </tr>
                </thead>
                <tbody>
                {agencies.map(a => (
                    <tr key={a.id}>
                        <td>{a.id}</td>
                        <td>{a.name}</td>
                        <td>{a.location}</td>
                        <td>
                            <button onClick={() => startEditing(a)}>Edit</button>
                            <button
                                onClick={() => deleteAgency(a.id)}
                                style={{ marginLeft: "5px" }}
                            >
                                Obriši
                            </button>
                            <button
                                onClick={() => fetchAgencyTrips(a.id)}
                                style={{ marginLeft: "5px" }}
                            >
                                Prikaži putovanja
                            </button>

                            {agencyTrips[a.id] && (
                                <ul style={{ marginTop: "8px" }}>
                                    {agencyTrips[a.id].length === 0 ? (
                                        <li>Nema putovanja</li>
                                    ) : (
                                        agencyTrips[a.id].map(trip => (
                                            <li key={trip.id}>
                                                {trip.destination} ({trip.duration} dana)
                                            </li>
                                        ))
                                    )}
                                </ul>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    page: {
        padding: "20px",
        backgroundColor: "#e3f2fd",
        minHeight: "100vh"
    },
    form: {
        backgroundColor: "#fff",
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "8px",
        maxWidth: "300px"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse"
    }
};

export default Agencies;
