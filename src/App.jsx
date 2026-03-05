import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/productDetail";


export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetail />} />

      </Routes>

    </BrowserRouter>
  );
}