import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const titles = {
    "/": "Dashboard",
    "/fruits": "Fruits",
    "/prices": "Prices",
    "/farmers": "Farmers",
    "/cards": "Cards",
    "/sizes": "Sizes"
  };

  const title = titles[location.pathname] || "Dashboard";

  return (
    <header className="w-full bg-white border-b border-gray-300 p-4 font-semibold text-lg">
      {title}
    </header>
  );
}