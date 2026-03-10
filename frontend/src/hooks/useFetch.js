import { useEffect, useState } from "react";
import api from "../services/api";

export default function useFetch(endpoint) {

  const [data,setData] = useState([]);

  useEffect(() => {
    api.get(endpoint)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  },[endpoint]);

  return data;
}