import { Button } from "antd";
import { formatPrice } from "../utils/formatPrice";
import "../style/main.css";

export default function ProductDetail({product}){

 return(

  <div className="detail">

    <img src={product.img}/>

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