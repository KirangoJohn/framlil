import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import "../styles/dashboard.css";
import api from "../services/api";

export default function Fruits() {

  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    fetchFruits();
  }, []);

  const fetchFruits = () => {
    api.get("fruits/")
      .then(res => {
        setFruits(res.data.results);
      })
      .catch(console.error);
  };

  return (
    <DashboardLayout>

      <div className="page-container">

      

        <table className="table">

          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>

          <tbody>

            {fruits.map(fruit => (
              <tr key={fruit.id}>
                <td>{fruit.name}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}