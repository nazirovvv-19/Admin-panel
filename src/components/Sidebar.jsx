import {
  FolderOpenOutlined,
  HomeOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router";

function Sidebar({ collapsed }) {
  const location = useLocation();
  return (
    <div className=""> 
      <aside className="h-full">
        <Menu
          style={{
            height: "100%",
            maxWidth: 300,
            paddingRight:15
          }}
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={[
            {
              key: "/",
              label: <Link to={"/"}>Home</Link>,
              icon: <HomeOutlined />,
            },
            {
              key: "/products",
              label: <Link to={"/products"}>Mahsulot</Link>,
              icon: <ProductOutlined />,
            },
            {
              key: "/categories",
              label: <Link to={"/categories"}>Kategoriya</Link>,
              icon: <FolderOpenOutlined />,
            },
            {
              key: "/rents",
              label: <Link to={"/rents"}>Ijaralar</Link>,
              icon: <FolderOpenOutlined />,
            },
            {
              key: "/user",
              label: <Link to={"/user"}>User</Link>,
              icon: <UserOutlined />,
            },
          ]}
        />
      </aside>
    </div>
  );
}

export default Sidebar;
