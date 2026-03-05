import { Card } from "antd";
import { formatPrice } from "../utils/formatPrice";
import { useNavigate } from "react-router-dom";
import "../style/main.css";

export default function ProductCard({product}){

  const nav = useNavigate();

  return (

    <Card
      className="product-card"
      hoverable
      cover={
        <div className="img-wrapper">

          <img src={product.img}/>

          <div className="discount">
            🔥 -{product.disPercent}%
          </div>

          <div className="best">
            Best Seller
          </div>

        </div>
      }
      onClick={()=>nav(`/product/${product.id}`)}
    >

      <h3>
        {product.name}
      </h3>

      <div className="price">

        <span className="new">
          {formatPrice(product.priceDis)}
        </span>

        <span className="old">
          {formatPrice(product.price)}
        </span>

      </div>

      <div className="save">
        💰 Tiết kiệm {formatPrice(product.price-product.priceDis)}
      </div>

    </Card>

  );
}