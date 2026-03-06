import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  message
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {
//   getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/contentfuladmin";
import { getProducts } from "../services/contentful";

export default function Admin() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/login";
    }

    loadProducts();
  }, []);

  const loadProducts = async () => {

    setLoading(true);

    try {

      const data = await getProducts();
      setProducts(data);

    } catch (e) {

      message.error("Lỗi tải sản phẩm");

    }

    setLoading(false);

  };

  const handleAdd = () => {

    setEditing(null);
    setFileList([]);

    form.resetFields();
    setModalOpen(true);

  };

  const handleEdit = (record) => {

    setEditing(record);

    form.setFieldsValue(record);

    const imgs = record.img?.map((url, index) => ({
      uid: index,
      name: "image",
      status: "done",
      url
    })) || [];

    setFileList(imgs);

    setModalOpen(true);

  };

  const handleDelete = async (id) => {

    Modal.confirm({
      title: "Xác nhận xóa sản phẩm?",
      onOk: async () => {

        await deleteProduct(id);

        message.success("Đã xóa");

        loadProducts();

      }
    });

  };

  const handleModalOk = async () => {

    try {

      const values = await form.validateFields();

      const images = fileList.map(file => file.url || file.thumbUrl);

      const payload = {
        ...values,
        img: images
      };

      if (editing) {

        await updateProduct(editing.id, payload);

        message.success("Đã cập nhật");

      } else {

        await createProduct(payload);

        message.success("Đã thêm mới");

      }

      setModalOpen(false);

      loadProducts();

    } catch (err) {}

  };

  const columns = [

    {
      title: "Ảnh",
      render: (_, record) => (
        <img
          src={record.img?.[0]}
          style={{ width: 60, height: 60, objectFit: "cover" }}
        />
      )
    },

    { title: "Tên", dataIndex: "name" },

    { title: "Giá", dataIndex: "price" },

    { title: "Giá KM", dataIndex: "priceDis" },

    { title: "% Giảm", dataIndex: "disPercent" },

    { title: "Danh mục", dataIndex: "category" },

    {
      title: "Hành động",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} type="link">
            Sửa
          </Button>

          <Button
            onClick={() => handleDelete(record.id)}
            type="link"
            danger
          >
            Xóa
          </Button>
        </>
      )
    }

  ];

  return (

    <div style={{ padding: 32 }}>

      <h1>Quản lý sản phẩm</h1>

      <Button
        type="primary"
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Thêm sản phẩm
      </Button>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
        loading={loading}
      />

      <Modal
        open={modalOpen}
        title={editing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        onCancel={() => setModalOpen(false)}
        onOk={handleModalOk}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
      >

        <Form
          form={form}
          layout="vertical"
        >

          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="priceDis"
            label="Giá KM"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="disPercent"
            label="% Giảm"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="link"
            label="Link Shopee"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="desc"
            label="Mô tả"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Hình ảnh">

            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              multiple
            >

              <div>
                <PlusOutlined />
                <div>Upload</div>
              </div>

            </Upload>

          </Form.Item>

        </Form>

      </Modal>

    </div>

  );

}