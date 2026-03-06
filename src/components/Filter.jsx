import { Slider, Tag, Input, Checkbox } from "antd";

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

export default function Filters({ onFilterChange, filter }) {
  // filter: { categories: [], price: [min,max], discount: [], search: "" }
  return (
    <div className="filters">
      <h4>TÌM KIẾM</h4>
      <Input.Search
        placeholder="Tìm sản phẩm..."
        value={filter?.search || ""}
        onChange={e => onFilterChange({ ...filter, search: e.target.value })}
        style={{ marginBottom: 16 }}
      />
      <h4>DANH MỤC</h4>
      <div className="cat-list">
        <Checkbox.Group
          options={categories}
          value={filter?.categories || []}
          onChange={val => onFilterChange({ ...filter, categories: val })}
        />
      </div>
      <h4>KHOẢNG GIÁ</h4>
      <Slider
        range
        max={10000000}
        value={filter?.price || [0, 10000000]}
        onChange={val => onFilterChange({ ...filter, price: val })}
        style={{ marginBottom: 16 }}
      />
      <h4>GIẢM TỐI THIỂU</h4>
      <Checkbox.Group
        options={["≥20%", "≥30%", "≥50%", "≥70%"]}
        value={filter?.discount || []}
        onChange={val => onFilterChange({ ...filter, discount: val })}
        style={{ display: "flex", flexDirection: "column", gap: 4 }}
      />
    </div>
  );
}