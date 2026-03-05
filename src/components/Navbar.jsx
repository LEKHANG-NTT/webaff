import { Layout, Button } from "antd";
import "../style/main.css";
const { Header } = Layout;

export default function Navbar() {
  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div style={{fontWeight:700,fontSize:20,color:"#ff5a00"}}>
        🔥 DealHot
      </div>

      <Button type="default">
        Trang chủ
      </Button>
    </Header>
  );
}