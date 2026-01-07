import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function Home() {
  return (
    <div
      className="home-page"
      style={{
        backgroundImage: "url(/planes.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div className="home-layout">

        {/* LEFT SIDE */}
        <div className="home-left">
          <h1 className="home-title">Dobrodošli</h1>
          <p className="home-subtitle">Izaberite kategoriju:</p>

          <div className="home-buttons">
            <Link to="/travelers"><button>Travelers</button></Link>
            <Link to="/agencies"><button>Agency</button></Link>
            <Link to="/trips"><button>Trips</button></Link>
          </div>
        </div>

        {/* RIGHT SIDE – IMAGES */}
        <div className="home-right">
          <img className="city-img" src="/mostar.jpg" alt="Mostar" />
          <img className="city-img" src="/sarajevo.jpg" alt="Sarajevo" />
          <img className="city-img wide" src="/tesanj.jpg" alt="Tešanj" />
        </div>

      </div>
    </div>
  );
}
