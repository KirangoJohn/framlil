export default function CardTable({ cards }) {

  return (
    <table className="custom-table">

      <thead>
        <tr>
          <th>Farmer</th>
          <th>ID Number</th>
          <th>Phone</th>
          <th>Vehicle</th>
          <th>GNR</th>
          <th>Crates</th>
          <th>Company</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {cards.map(card => (
          <tr key={card.id}>
            <td>{card.farmer}</td>
            <td>{card.national_id}</td>
            <td>{card.phone}</td>
            <td>{card.vehicle_no}</td>
            <td>{card.gnr}</td>
            <td>{card.crates}</td>
            <td>{card.company_name}</td>

            <td>
              <button className="btn-edit">Edit</button>
              <button className="btn-delete">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  )
}