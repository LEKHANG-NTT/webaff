import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { formatPrice } from "../utils/formatPrice";
import { getProductById } from "../services/contentful";
import "../style/main.css";

export default function ProductDetail(){

  const { id } = useParams();

  const [product,setProduct] = useState(null);

  useEffect(()=>{
    loadProduct();
  },[id]);

  const loadProduct = async()=>{

    const data = await getProductById(id);

    setProduct(data);

  }

  if(!product){
    return <div>Loading...</div>
  }

  return(

    <div className="detail">

      <img src={product.img} alt={product.name}/>

      <div className="detail-info">

        <h1>{product.name}</h1>

        <div className="price-box">

          <span className="price-new">
            {formatPrice(product.priceDis)}
          </span>

          <span className="price-old">
            {formatPrice(product.price)}
          </span>

        </div>

        <p>{product.desc}</p>

        <Button
          type="primary"
          size="large"
          href={product.link}
          target="_blank"
          className="buy-btn"
        >
          Mua ngay trên Shopee
        </Button>

      </div>

    </div>

  )
}