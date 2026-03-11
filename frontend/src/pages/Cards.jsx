import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import { Table, Pagination } from "react-bootstrap";

export default function Cards() {

  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [totalRecords, setTotalRecords] = useState(0)

  useEffect(() => {

  api.get(`cards/?page=${currentPage}&search=${searchTerm}`)
    .then(res => {
      setCards(res.data.results)
      setTotalRecords(res.data.count)
    })
    .catch(err => console.error(err))

}, [currentPage, searchTerm])

  // Pagination logic
  const currentCards = cards;
  const totalPages = Math.ceil(totalRecords / cardsPerPage);

  // Pagination UI
  const PaginationControls = (
    <div className="d-flex justify-content-center align-items-center my-3">

      <Pagination className="mb-0">

        <Pagination.Prev
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        />

        <div className="mx-3 text-muted" style={{ fontSize: "0.9rem" }}>
          Page <strong>{currentPage}</strong> of {totalPages || 1}
        </div>

        <Pagination.Next
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        />

      </Pagination>

    </div>
  );

  return (
    <DashboardLayout>

      <div className="shadow-sm bg-white rounded p-3 mb-4">

        {/* Search + Add */}
        <div className="mb-3 d-flex justify-content-between align-items-center">

          <input
            type="text"
            className="form-control"
            style={{ maxWidth: "300px" }}
            placeholder="Search farmers, vehicles..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="btn btn-primary">
            + Add Card
          </button>

        </div>

        {/* Pagination TOP */}
        {PaginationControls}

        <Table hover responsive style={{ fontSize: "0.95rem" }}>

          <thead className="table-light">
            <tr>
              <th style={{ width: "30%", padding: "12px" }}>Farmer</th>
              <th style={{ width: "30%", padding: "12px" }}>ID Number</th>
              <th style={{ width: "30%", padding: "12px" }}>Phone</th>
              <th style={{ width: "20%", padding: "12px" }}>Vehicle</th>
              <th style={{ width: "25%", padding: "12px" }}>GNR</th>
              <th style={{ width: "25%", padding: "12px" }}>Crates</th>
              <th style={{ width: "180px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>

            {currentCards.map(card => (

              <tr key={card.id}>

                <td style={{ padding: "12px" }}>
                  {card.farmer}
                </td>

                <td style={{ padding: "12px" }}>
                  {card.national_id}
                </td>

                <td style={{ padding: "12px" }}>
                  {card.phone}
                </td>

                <td style={{ padding: "12px" }}>
                  {card.vehicle_no}
                </td>

                <td style={{ padding: "12px" }}>
                  {card.gnr}
                </td>

                <td style={{ padding: "12px" }}>
                  {card.crates}
                </td>

                <td>
                  <div className="d-flex gap-2">

                    <button className="btn btn-sm btn-warning">
                      Edit
                    </button>

                    <button className="btn btn-sm btn-danger">
                      Delete
                    </button>

                  </div>
                </td>

              </tr>

            ))}

          </tbody>

        </Table>

        {/* Pagination BOTTOM */}
        {PaginationControls}

      </div>

    </DashboardLayout>
  );
}