import React from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";
import useMyStore from "../store/my-store";

function Navbar({ collapsed, toggleCollapsed }) {
  const loginName = useMyStore();

  return (
    <div>
      <nav className="bg-slate-900 pt-4 pb-2 px-6 text-white flex items-center justify-between">
        <div className="flex gap-2 ">
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Button>
          <p className="mt-1">logo</p>
        </div>
        <Dropdown 
        menu={{
          items:[
            {
              key:1,
              label:"sozlamalar",
              icon:<SettingOutlined/>
            },
            {
              key:2,
              label:"profil",
              icon:<UserOutlined/>
            },
            {
              key:3,
              label:"chiqish",
              icon:<LogoutOutlined/>,
              danger:true,
              onClick:() => {
                loginName.logOut();
              }
            }
          ]
        }}>
          <div className="flex gap-5 items-center">
            <Avatar size="large" icon={<UserOutlined />} />
            <div className="text-sm">
              <p>
                {loginName.users.firstName} {loginName.users.lastName}
              </p>
              <p>@{loginName.users.username}</p>
            </div>
           
          </div>
        </Dropdown>
      </nav>
    </div>
  );
}

export default Navbar;
