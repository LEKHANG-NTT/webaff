import { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import Filters from "../components/Filter";
import ProductGrid from "../components/ProductGrid";
import { getProducts } from "../services/contentful";


const { Content } = Layout;

export default function Home() {

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({
    categories: [],
    price: [0, 10000000],
    discount: [],
    search: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [products, filter]);

  const loadProducts = async () => {
    const data = await getProducts();
    console.log("Loaded products:", data);
    setProducts(data);
    setFiltered(data);
  };

  const handleFilter = () => {
    let result = [...products];
    // Filter by categories
    if (filter.categories && filter.categories.length > 0 && !filter.categories.includes("Tất cả")) {
      result = result.filter(p => filter.categories.includes(p.category));
    }
    // Filter by price
    result = result.filter(p => p.priceDis >= filter.price[0] && p.priceDis <= filter.price[1]);
    // Filter by discount
    if (filter.discount && filter.discount.length > 0) {
      let minDis = 0;
      filter.discount.forEach(d => {
        const val = parseInt(d.replace("≥", "").replace("%", ""));
        if (val > minDis) minDis = val;
      });
      result = result.filter(p => p.disPercent >= minDis);
    }
    // Filter by search
    if (filter.search && filter.search.trim() !== "") {
      const s = filter.search.trim().toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(s));
    }
    setFiltered(result);
  };

  return(

    <Layout>

      {/* navbar */}
      <Navbar/>

      {/* banner */}
      <HeroBanner/>

      <Content style={{padding:"40px"}}>

        {/* filter */}
        <Filters filter={filter} onFilterChange={setFilter} />

        <h3 style={{margin:"20px 0"}}>
          {filtered.length} sản phẩm
        </h3>

        {/* grid */}
        <ProductGrid products={filtered}/>

      </Content>

    </Layout>

  )
}