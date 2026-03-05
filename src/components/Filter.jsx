import { Slider, Tag } from "antd";

const categories = [
  "Tất cả",
  "Thời trang",
  "Điện tử",
  "Gia dụng",
  "Mỹ phẩm",
  "Thực phẩm",
  "Sách",
  "Thể thao"
];

export default function Filters() {

  return (
    <div className="filters">

      <h4>DANH MỤC</h4>

      <div className="cat-list">

        {categories.map(c => (
          <Tag
            key={c}
            className="cat-tag"
          >
            {c}
          </Tag>
        ))}

      </div>

      <h4>KHOẢNG GIÁ</h4>

      <Slider
        range
        max={10000000}
        defaultValue={[0,10000000]}
      />

      <h4>GIẢM TỐI THIỂU</h4>

      <div className="discount-tags">

        <Tag>≥20%</Tag>
        <Tag>≥30%</Tag>
        <Tag>≥50%</Tag>
        <Tag>≥70%</Tag>

      </div>

    </div>
  );
}