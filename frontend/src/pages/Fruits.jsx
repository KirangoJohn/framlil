import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

export default function Fruits() {

  const [fruits, setFruits] = useState([]);

  useEffect(() => {

    api.get("fruits/")
      .then(res => {
        console.log(res.data);   // check data
        setFruits(res.data.results);
      })
      .catch(err => console.error(err));

  }, []);

  return (
    <DashboardLayout>
      <table border="1" cellPadding="10" style={{marginTop:"20px"}}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>

          {fruits.map(fruit => (
            <tr key={fruit.id}>
              <td>{fruit.id}</td>
              <td>{fruit.name}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </DashboardLayout>
  );
}