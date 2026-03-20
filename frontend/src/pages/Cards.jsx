import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

export default function Cards() {
  const initialForm = {
    farmer: "",
    national_id: "",
    company_name: "",
    vehicle_no: "",
    gnr: "",
    phone: "",
    crates: ""
  };

  const fields = [
    { name: "farmer", label: "Farmer" },
    { name: "national_id", label: "National ID" },
    { name: "company_name", label: "Company" },
    { name: "vehicle_no", label: "Vehicle" },
    { name: "gnr", label: "GNR" },
    { name: "phone", label: "Phone" },
    { name: "crates", label: "Crates" }
  ];

  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialForm);

  const cardsPerPage = 10;

  useEffect(() => fetchCards(), [currentPage, searchTerm]);

  const fetchCards = () => {
    api.get(`cards/?page=${currentPage}&search=${searchTerm}`)
      .then(res => {
        setCards(res.data.results);
        setTotalRecords(res.data.count);
      })
      .catch(console.error);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    setError("");
    const request = editingCard
      ? api.put(`cards/${editingCard.id}/`, formData)
      : api.post("cards/", formData);

    request
      .then(() => {
        fetchCards();
        setShowForm(false);
        setFormData(initialForm);
      })
      .catch(err => {
        const data = err.response?.data;
        setError(data?.non_field_errors?.[0] || "Failed to save record");
      });
  };

  const totalPages = Math.ceil(totalRecords / cardsPerPage);

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-4">
        <input
          className="border rounded p-2 w-64"
          placeholder="Search farmers, vehicles..."
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setEditingCard(null);
            setFormData(initialForm);
            setShowForm(true);
          }}
        >
          Add Card
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">{editingCard ? "Edit Card" : "Add Card"}</h3>
          {error && <div className="text-red-600 mb-4">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(field => (
              <input
                key={field.name}
                name={field.name}
                placeholder={field.label}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleSubmit}>
              Save
            </button>
            <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="w-full table-auto bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            {["Farmer", "ID", "Phone", "Vehicle", "GNR", "Crates", "Company", "Actions"].map((h) => (
              <th key={h} className="p-3 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cards.map(card => (
            <tr key={card.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{card.farmer}</td>
              <td className="p-3">{card.national_id}</td>
              <td className="p-3">{card.phone}</td>
              <td className="p-3">{card.vehicle_no}</td>
              <td className="p-3">{card.gnr}</td>
              <td className="p-3">{card.crates}</td>
              <td className="p-3">{card.company_name}</td>
              <td className="p-3 flex gap-2">
                <button className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-3 py-1">Page {currentPage} of {totalPages || 1}</span>
        <button
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </DashboardLayout>
  );
}