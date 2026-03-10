import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const linkStyle = {
    display: "block",
    padding: "12px 15px",
    marginBottom: "8px",
    borderRadius: "6px",
    textDecoration: "none",
    color: "white"
  };

  const activeStyle = {
    background: "#334155"
  };

  return (
    <div
      style={{
        width: "220px",
        background: "#1e293b",
        color: "white",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h2>PESH</h2>

      <nav>

        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/fruits"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          Fruits
        </NavLink>

        <NavLink
          to="/prices"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          Prices
        </NavLink>

        <NavLink
          to="/farmers"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          Farmers
        </NavLink>

      </nav>
    </div>
  );
}