import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Row } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    console.log("Loaded product detail:", data);
    setProduct(data);
  }

  if(!product){
    return <div>Loading...</div>
  }

  // 🔥 lọc ảnh rỗng
  const images = (Array.isArray(product.img) ? product.img : [product.img])
    .filter(Boolean);

  const sliderSettings = {
    dots:true,
    infinite:images.length > 1,
    speed:400,
    slidesToShow:1,
    slidesToScroll:1,
    arrows:false
  }

  return(
 <Row>
  <Col span={12}>
  {images.length > 1 ? (

        <Slider {...sliderSettings}>
          {images.map((img,idx)=>(
            <img
              key={idx}
              src={img}
              alt={product.name}
              style={{width:"100%",maxHeight:350,objectFit:"cover"}}
            />
          ))}
        </Slider>

      ) : (

        images[0] && (
          <img
            src={images[0]}
            alt={product.name}
            style={{width:"100%",maxHeight:350,objectFit:"cover"}}
          />
        )

      )}
  </Col>
   <Col span={12}>
   <div className="detail-info" style={{padding:"40px"}}>
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
  </Col>

 </Row>
//     <div style={{display:"flex",flexDirection:"",gap:16,margin:"20px auto"}}>
// <div>
//       {images.length > 1 ? (

//         <Slider {...sliderSettings}>
//           {images.map((img,idx)=>(
//             <img
//               key={idx}
//               src={img}
//               alt={product.name}
//               style={{width:"100%",maxHeight:350,objectFit:"cover"}}
//             />
//           ))}
//         </Slider>

//       ) : (

//         images[0] && (
//           <img
//             src={images[0]}
//             alt={product.name}
//             style={{width:"100%",maxHeight:350,objectFit:"cover"}}
//           />
//         )

//       )}
// </div>
//       <div className="detail-info">

//         <h1>{product.name}</h1>

//         <div className="price-box">

//           <span className="price-new">
//             {formatPrice(product.priceDis)}
//           </span>

//           <span className="price-old">
//             {formatPrice(product.price)}
//           </span>

//         </div>

//         <p>{product.desc}</p>

//         <Button
//           type="primary"
//           size="large"
//           href={product.link}
//           target="_blank"
//           className="buy-btn"
//         >
//           Mua ngay trên Shopee
//         </Button>

//       </div>

//     </div>

  )
}