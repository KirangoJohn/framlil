import React from "react";
import { NavLink } from "react-router-dom";
// Import icons from a library like lucide-react
import { LayoutDashboard, Apple, Tag, Users, CreditCard, Maximize } from "lucide-react";

const links = [
  { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { path: "/fruits", label: "Fruits", icon: <Apple size={20} /> },
  { path: "/prices", label: "Prices", icon: <Tag size={20} /> },
  { path: "/farmers", label: "Farmers", icon: <Users size={20} /> },
  { path: "/cards", label: "Cards", icon: <CreditCard size={20} /> },
  { path: "/sizes", label: "Sizes", icon: <Maximize size={20} /> },
];

export default function Sidebar() {
  return (
    <aside className="w-56 bg-gray-800 min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-white px-4">PESH</h2>

      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-4 rounded text-white transition-colors font-medium decoration-transparent no-underline
               ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
            }
          >
            {/* Render the icon next to the label */}
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
