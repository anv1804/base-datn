import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Upload,
  Image,
  notification,
  Table,
  Pagination,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { UploadChangeParam, RcFile } from "antd/es/upload/interface";
import BackToTop from "../backToTop";

interface Product {
  key: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  views: number;
  sales: number;
}

const initialData: Product[] = [
  {
    key: "1",
    name: "Sản phẩm 1",
    image: "https://via.placeholder.com/100",
    description: "Mô tả sản phẩm 1",
    category: "Danh mục 1",
    price: 100000,
    views: 120,
    sales: 80,
  },
  // Thêm nhiều sản phẩm hơn ở đây để kiểm tra phân trang
];

const ProductTable: React.FC = () => {
  const [isEditProductModalVisible, setIsEditProductModalVisible] =
    useState<boolean>(false);
  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    if (selectedProduct) {
      form.setFieldsValue({
        name: selectedProduct.name,
        description: selectedProduct.description,
        category: selectedProduct.category,
        price: selectedProduct.price,
        views: selectedProduct.views,
        sales: selectedProduct.sales,
      });
      setImageUrl(selectedProduct.image);
    } else {
      form.resetFields();
      setImageUrl(null); // Clear image URL when adding new product
    }
  }, [selectedProduct, form]);

  const handleUploadChange = (info: UploadChangeParam<RcFile>) => {
    if (info.file.status === "done") {
      if (info.file.originFileObj) {
        setImageUrl(URL.createObjectURL(info.file.originFileObj));
        notification.success({
          message: "Tải lên thành công",
          description: "Ảnh đã được tải lên thành công.",
          placement: "topRight",
          duration: 5,
        });
      }
    } else if (info.file.status === "error") {
      notification.error({
        message: "Tải lên thất bại",
        description: "Đã xảy ra lỗi khi tải lên ảnh.",
        placement: "topRight",
        duration: 5,
      });
    }
  };

  const handleEditProduct = (record: Product) => {
    setSelectedProduct(record);
    setIsEditProductModalVisible(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setImageUrl(null); // Clear image URL when adding new product
    form.resetFields(); // Clear form fields
    setIsAddProductModalVisible(true);
  };

  const handleEditProductOk = () => {
    form.validateFields().then((values) => {
      console.log("Sửa sản phẩm:", values);
      setIsEditProductModalVisible(false);
      notification.success({
        message: "Cập nhật thành công",
        description: "Sản phẩm đã được cập nhật.",
        placement: "topRight",
        duration: 5,
      });
    });
  };

  const handleEditProductCancel = () => {
    setIsEditProductModalVisible(false);
  };

  const handleAddProductOk = () => {
    form.validateFields().then((values) => {
      console.log("Thêm sản phẩm:", values);
      setIsAddProductModalVisible(false);
      notification.success({
        message: "Thêm thành công",
        description: "Sản phẩm mới đã được thêm.",
        placement: "topRight",
        duration: 5,
      });
    });
  };

  const handleAddProductCancel = () => {
    setIsAddProductModalVisible(false);
  };

  const handleDeleteProduct = (record: Product) => {
    Modal.confirm({
      title: "Xóa sản phẩm",
      content: `Bạn có chắc chắn muốn xóa sản phẩm "${record.name}" không?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        console.log("Xóa sản phẩm:", record);
        notification.success({
          message: "Xóa thành công",
          description: `Sản phẩm "${record.name}" đã được xóa.`,
          placement: "topRight",
          duration: 5,
        });
      },
    });
  };

  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "Sản phẩm", dataIndex: "name", key: "name" },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (text: string) => <Image width={100} src={text} alt="Product" />,
    },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    { title: "Danh mục", dataIndex: "category", key: "category" },
    { title: "Giá", dataIndex: "price", key: "price" },
    { title: "Lượt xem", dataIndex: "views", key: "views" },
    { title: "Lượt bán", dataIndex: "sales", key: "sales" },
    {
      title: "Hành động",
      key: "action",
      render: (text: string, record: Product) => (
        <div className="flex">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
            style={{ marginRight: 8, color: "#1890ff", borderColor: "#1890ff" }}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(record)}
            style={{ color: "#ff4d4f", borderColor: "#ff4d4f" }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-6">
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>
          Tổng sản phẩm: {initialData.length} sản phẩm
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddProduct}
        >
          Thêm sản phẩm mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={initialData}
        bordered
      />
      {/* <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={initialData.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 16, textAlign: "center" }}
      /> */}
      <Modal
        title="Sửa sản phẩm"
        visible={isEditProductModalVisible}
        onOk={handleEditProductOk}
        onCancel={handleEditProductCancel}
        footer={[
          <Button key="back" onClick={handleEditProductCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditProductOk}>
            Cập nhật
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-between items-center">
            <div className="flex-1 flex items-center justify-center">
              <Form.Item label="Tải lên ảnh mới" name="image">
                <Upload
                  name="image"
                  listType="picture"
                  showUploadList={false}
                  onChange={handleUploadChange}
                  beforeUpload={() => false} // Prevent auto upload
                >
                  <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload>
              </Form.Item>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {selectedProduct?.image && (
                <div>
                  <Form.Item>
                    <Image
                      width={100}
                      className="rounded-md"
                      src={selectedProduct.image}
                      alt="Current Product Image"
                    />
                  </Form.Item>
                </div>
              )}
            </div>
          </div>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: "Vui lòng nhập danh mục!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Lượt xem"
            name="views"
            rules={[{ required: true, message: "Vui lòng nhập số lượt xem!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Lượt bán"
            name="sales"
            rules={[{ required: true, message: "Vui lòng nhập số lượt bán!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm sản phẩm"
        visible={isAddProductModalVisible}
        onOk={handleAddProductOk}
        onCancel={handleAddProductCancel}
        footer={[
          <Button key="back" onClick={handleAddProductCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddProductOk}>
            Thêm
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <div className="flex justify-between">
            <div className="flex-1 ">
              <Form.Item
                label="Tải lên ảnh"
                name="image"
                rules={[
                  { required: true, message: "Vui lòng tải lên ảnh sản phẩm!" },
                ]}
              >
                <Upload
                  name="image"
                  listType="picture"
                  showUploadList={false}
                  onChange={handleUploadChange}
                  beforeUpload={() => false} // Prevent auto upload
                >
                  <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload>
                {imageUrl && (
                  <Image
                    width={200}
                    src={imageUrl}
                    alt="Product Image Preview"
                    style={{ marginTop: 16 }}
                  />
                )}
              </Form.Item>
            </div>
            <div className="flex-1 ">
              {/* Placeholder for current image if needed */}
            </div>
          </div>
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: "Vui lòng nhập danh mục!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Lượt xem"
            name="views"
            rules={[{ required: true, message: "Vui lòng nhập số lượt xem!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Lượt bán"
            name="sales"
            rules={[{ required: true, message: "Vui lòng nhập số lượt bán!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductTable;
