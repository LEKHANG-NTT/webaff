import { Layout } from "antd";
import "../style/main.css";
const { Header } = Layout;

export default function AppHeader() {

  return (

    <Header
      style={{
        background: "#fff",
        fontSize: 22,
        fontWeight: 600
      }}
    >

      Shopee Deal Hot 🔥

    </Header>

  );
}