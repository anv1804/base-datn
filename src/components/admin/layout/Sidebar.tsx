import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  ProductOutlined,
  InsertRowAboveOutlined,
  CalendarOutlined,
  TruckOutlined,
  FundViewOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

// Định nghĩa mapping URL đến các SubMenu key
const pathToSubMenuKey: Record<string, string> = {
  // sub1 - products
  "/products": "product",
  "/product/add": "product",
  "/product/edit/:id": "product",
  "/product/delete:id": "product",
  "/warehouse": "product",
  // sub2 - orders
  "/tables": "table",
  "/table/add": "table",
  "/table/edit/:id": "table",
  "/table/delete/:id": "table",
  // order 
  "/orders": "order",
  "/order/delete/:id": "order",

  // Thêm các đường dẫn khác tương ứng với SubMenu key
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    // Lấy key của SubMenu từ location.pathname
    const currentSubMenuKey = pathToSubMenuKey[location.pathname];
    setSelectedKey(location.pathname);

    if (currentSubMenuKey) {
      setOpenKeys([currentSubMenuKey]);
    } else {
      setOpenKeys([]);
    }
  }, [location]);

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Sider className="h-screen bg-white font-sans px-3" width={250}>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        className="h-screen text-white bg-transparent"
      >
        <div className="text-center p-4 text-black">
          <h2 className="text-lg font-bold">My App</h2>
        </div>
        <div className="line border border-t-[0.2px] w-[80%] mx-auto"></div>
        {/* DASHBOARD */}
        <Menu.Item
          key="/"
          icon={<DashboardOutlined />}
          className="hover:text-blue-500 rounded-lg"
        >
          <Link to="/" className="text-white hover:text-blue-500">
            Dashboard
          </Link>
        </Menu.Item>
        {/* PRODUCT */}
        <SubMenu
          key="product"
          icon={<ProductOutlined />}
          title="Sản phẩm"
          className="text-white hover:text-blue-500 rounded-lg"
        >
          <Menu.Item key="/products">
            <Link to="/products" className="text-white hover:text-blue-500">
              Danh sách sản phẩm
            </Link>
          </Menu.Item>
          <Menu.Item key="/warehouse">
            <Link to="/warehouse" className="text-white hover:text-blue-500">
              Kho hàng
            </Link>
          </Menu.Item>
        </SubMenu>
        {/* TABLE */}
        <SubMenu
          key="table"
          icon={<InsertRowAboveOutlined />}
          title="Bàn"
          className="text-white hover:text-blue-500 rounded-lg"
        >
          <Menu.Item key="/tables">
            <Link to="/tables" className="text-white hover:text-blue-500">
              Danh sách bàn
            </Link>
          </Menu.Item>
        </SubMenu>
        {/* ORDER */}
        <SubMenu
          key="order"
          icon={<CalendarOutlined />}
          title="Đơn hàng"
          className="text-white hover:text-blue-500 rounded-lg"
        >
          <Menu.Item key="/orders">
            <Link to="/orders" className="text-white hover:text-blue-500">
              Danh sách đơn
            </Link>
          </Menu.Item>
          <Menu.Item key="/users/add">
            <Link to="/users/add" className="text-white hover:text-blue-500">
              Add User
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub3"
          icon={<UserOutlined />}
          title="Nhân Sự"
          className="text-white hover:text-blue-500 rounded-lg"
        >
          <Menu.Item key="/users/list">
            <Link to="/users/list" className="text-white hover:text-blue-500">
              User List
            </Link>
          </Menu.Item>
          <Menu.Item key="/users/add">
            <Link to="/users/add" className="text-white hover:text-blue-500">
              Add User
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub3"
          icon={<UserOutlined />}
          title="Giao hàng"
          className="text-white hover:text-blue-500 rounded-lg"
        >
          <Menu.Item key="/users/list">
            <Link to="/users/list" className="text-white hover:text-blue-500">
              User List
            </Link>
          </Menu.Item>
          <Menu.Item key="/users/add">
            <Link to="/users/add" className="text-white hover:text-blue-500">
              Add User
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub3"
          icon={<SettingOutlined />}
          title="Settings"
          className="text-white hover:text-blue-500 rounded-lg"
        >
          <Menu.Item key="/settings/profile">
            <Link
              to="/settings/profile"
              className="text-white hover:text-blue-500"
            >
              Profile Settings
            </Link>
          </Menu.Item>
          <Menu.Item key="/settings/account">
            <Link
              to="/settings/account"
              className="text-white hover:text-blue-500"
            >
              Account Settings
            </Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          key="signout"
          icon={<LogoutOutlined />}
          className="absolute bottom-0 w-full hover:text-red-500"
        >
          <Link to="/signout" className="text-white hover:text-red-500">
            Sign Out
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
