import { FolderOpenOutlined, HomeOutlined, ProductOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router";

function Sidebar({ collapsed }) {
    const location = useLocation()
  return (
    <div>
      <aside className="h-full">
        <Menu
          style={{
            height: '100%',
            minWidth: 200,
            width:"100%"
          }}
          
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        //   selectedKeys={["2"]}
          items={[
            {
              key: '/',
              label: <Link to={"/"}>Home</Link>,
              icon: <HomeOutlined />,
            },
            {
              key: '/products',
              label: <Link to={"/products"}>Mahsulot</Link>,
              icon: <ProductOutlined />,
            },
            {
              key: '/categories',
              label: <Link to={"/categories"}>Kategoriya</Link>,
              icon: <FolderOpenOutlined />,
            },
          ]}
        />
      </aside>
    </div>
  );
}

export default Sidebar;
