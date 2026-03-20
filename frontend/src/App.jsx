import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Fruits from "./pages/Fruits";
import Cards from "./pages/Cards";
import Sizes from "./pages/Sizes";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/sizes" element={<Sizes/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;