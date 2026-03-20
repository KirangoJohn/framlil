import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import SizeForm from "../components/SizeForm";
import SizeTable from "../components/SizeTable";
import "../styles/sizes.css";
import api from "../services/api";

export default function Sizes() {

  const initialForm = { size: "" };

  const [sizes, setSizes] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [editingSize, setEditingSize] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSizes();
  }, []);

  const fetchSizes = () => {
    api.get("sizes/")
      .then(res => setSizes(res.data.results))
      .catch(console.error);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, size: e.target.value });
  };

  const handleSubmit = () => {

    setError("");

    const request = editingSize
      ? api.put(`sizes/${editingSize.id}/`, formData)
      : api.post("sizes/", formData);

    request
      .then(() => {
        fetchSizes();
        setShowForm(false);
        setFormData(initialForm);
        setEditingSize(null);
      })
      .catch(() => {
        setError("Failed to save size");
      });
  };

  const handleEdit = (size) => {
    setEditingSize(size);
    setFormData({ size: size.size });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this size?")) return;

    api.delete(`sizes/${id}/`)
      .then(fetchSizes)
      .catch(console.error);
  };

  return (
    <DashboardLayout>

      <div className="page-container">

        <div className="page-header">
          <h5>Sizes</h5>

          <button
            className="btn-primary"
            onClick={() => {
              setShowForm(true);
              setEditingSize(null);
              setFormData(initialForm);
            }}
          >
            + Add Size
          </button>
        </div>

        {showForm && (
          <SizeForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            onCancel={() => setShowForm(false)}
            editingSize={editingSize}
          />
        )}

        <SizeTable
          sizes={sizes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>

    </DashboardLayout>
  );
}