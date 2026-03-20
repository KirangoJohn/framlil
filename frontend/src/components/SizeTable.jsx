export default function SizeTable({ sizes, onEdit, onDelete }) {

  return (
    <table className="table">

      <thead>
        <tr>
          <th>ID</th>
          <th>Size</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {sizes.map(size => (
          <tr key={size.id}>
            <td>{size.id}</td>
            <td>{size.size}</td>

            <td>
              <button
                className="btn-edit"
                onClick={() => onEdit(size)}
              >
                Edit
              </button>

              <button
                className="btn-delete"
                onClick={() => onDelete(size.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}

      </tbody>

    </table>
  );
}