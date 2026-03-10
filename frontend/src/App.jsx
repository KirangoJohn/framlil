import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Fruits from "./pages/Fruits";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/fruits" element={<Fruits />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;