export default function CardForm({
  fields,
  formData,
  handleChange,
  handleSubmit,
  error,
  onCancel,
  editingCard
}) {
  return (
    <div className="card-form">

      <h5>{editingCard ? "Edit Card" : "Add Card"}</h5>

      {error && <div className="form-error">{error}</div>}

      {fields.map(field => (
        <input
          key={field.name}
          name={field.name}
          placeholder={field.label}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className="form-input"
        />
      ))}

      <div className="form-actions">
        <button className="btn-save" onClick={handleSubmit}>
          Save
        </button>

        <button className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>

    </div>
  )
}