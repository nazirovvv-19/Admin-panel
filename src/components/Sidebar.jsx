import {
  BookOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  ProductOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router";

function Sidebar({ collapsed }) {
  const location = useLocation();
  return (
    <div className="">
      <aside className="h-full ">
        <Menu
          style={{
            height: "100%",
            maxWidth: 300,
            paddingRight:   5,
            
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
              icon: <ProfileOutlined />,
            },
            {
              key: "/user",
              label: <Link to={"/user"}>Users</Link>,
              icon: <UserOutlined />,
            },
            {
              key: "/stock",
              label: <Link to={"/stock"}>Kitoblarim</Link>,
              icon: <BookOutlined />,
            },
            {
              key: "/book",
              label: <Link to={"/book"}>Kitoblar</Link>,
              icon: <BookOutlined />,
            },
          ]}
        />
      </aside>
    </div>
  );
}

export default Sidebar;
