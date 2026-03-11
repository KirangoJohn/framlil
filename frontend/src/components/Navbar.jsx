import { useLocation } from "react-router-dom";

export default function Navbar() {

  const location = useLocation();

  const titles = {
    "/": "Dashboard",
    "/fruits": "Fruits",
    "/prices": "Prices",
    "/farmers": "Farmers",
     "/cards": "Cards",
  };

  const title = titles[location.pathname] || "Dashboard";

  return (
    <div
      style={{
        width: "100%",
        background: "#f1f5f9",
        padding: "12px 20px",
        borderBottom: "1px solid #ddd",
        boxSizing: "border-box",
        fontWeight: "bold",
        fontSize: "18px"
      }}
    >
      {title}
    </div>
  );
}