export default function SizeForm({
  formData,
  handleChange,
  handleSubmit,
  error,
  onCancel,
  editingSize
}) {
  return (
    <div className="form-card">

      <h5>{editingSize ? "Edit Size" : "Add Size"}</h5>

      {error && <div className="form-error">{error}</div>}

      <input
        type="number"
        placeholder="Enter size (e.g. 24)"
        value={formData.size}
        onChange={handleChange}
        className="form-input"
      />

      <div className="form-actions">
        <button className="btn-save" onClick={handleSubmit}>
          Save
        </button>

        <button className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>

    </div>
  );
}