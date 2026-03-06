import { Card } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatPrice } from "../utils/formatPrice";
import { useNavigate } from "react-router-dom";
import "../style/main.css";

export default function ProductCard({product}){

  const nav = useNavigate();

  // Hỗ trợ nhiều hình ảnh: product.img là mảng hoặc string
  const images = Array.isArray(product.img) ? product.img : [product.img];
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  return (
    <Card
      className="product-card"
      hoverable
      cover={
        <div className="img-wrapper">
          {images.length > 1 ? (
            <Slider {...sliderSettings}>
              {images.map((img, idx) => (
                <img src={img} key={idx} style={{ width: "100%", height: 200, objectFit: "cover" }} />
              ))}
            </Slider>
          ) : (
            <img src={images[0]} style={{ width: "100%", height: 200, objectFit: "cover" }} />
          )}
          <div className="discount">
            🔥 -{product.disPercent}%
          </div>
          <div className="best">
            Best Seller
          </div>
        </div>
      }
      onClick={() => nav(`/product/${product.id}`)}
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
        💰 Tiết kiệm {formatPrice(product.price - product.priceDis)}
      </div>
    </Card>
  );
}