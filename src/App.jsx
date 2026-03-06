import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/productDetail";
import Login from "./pages/Login";
import Admin from "./pages/Admin";


export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>

    </BrowserRouter>
  );
}