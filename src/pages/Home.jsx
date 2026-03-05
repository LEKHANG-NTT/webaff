import { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import Filters from "../components/Filter";
import ProductGrid from "../components/ProductGrid";
import { getProducts } from "../services/contentful";

// import Navbar from "../components/Navbar";
// import HeroBanner from "../components/HeroBanner";
// import Filters from "../components/Filters";
// import ProductGrid from "../components/ProductGrid";

// import { getProducts } from "../services/contentful";

const { Content } = Layout;

export default function Home() {

  const [products,setProducts] = useState([]);
  const [filtered,setFiltered] = useState([]);

  useEffect(()=>{
    loadProducts();
  },[]);

  const loadProducts = async()=>{

    const data = await getProducts();

    setProducts(data);
    setFiltered(data);

  }

  return(

    <Layout>

      {/* navbar */}
      <Navbar/>

      {/* banner */}
      <HeroBanner/>

      <Content style={{padding:"40px"}}>

        {/* filter */}
        <Filters/>

        <h3 style={{margin:"20px 0"}}>
          {filtered.length} sản phẩm
        </h3>

        {/* grid */}
        <ProductGrid products={filtered}/>

      </Content>

    </Layout>

  )
}