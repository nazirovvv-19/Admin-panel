import React from "react";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useMyStore from "../store/my-store";

function Navbar({collapsed,toggleCollapsed}) {
  const loginName = useMyStore()

  return (
    <div>
      <nav className="bg-slate-900 p-5 text-white flex items-center justify-between">
        <div className="flex gap-2 ">
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Button>
          <p>logo</p>
        </div>
       <div className="flex gap-5">
       <p>{loginName.users.username}</p>
       <LogoutOutlined onClick={()=>{loginName.logOut()}} />
       </div>
        
      </nav>
    </div>
  );
}

export default Navbar;
