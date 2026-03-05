import { Row, Col } from "antd";
import ProductCard from "./ProductCard";
import "../style/main.css";
export default function ProductGrid({products}){

  return(

    <Row gutter={[20,20]}>

      {products.map(p=>(
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={6}
          key={p.id}
        >
          <ProductCard product={p}/>
        </Col>
      ))}

    </Row>

  );
}