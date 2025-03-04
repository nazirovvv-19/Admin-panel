import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import { message, Spin, Table } from "antd";
import ButtonAndForm from "../components/ButtonAndForm";
import EditUser from "../components/EditUser";
import api from "../api/Api";

function UsersPage() {
  const state = useMyStore();
  const [userss, setUserss] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState()

  const pageSize = 10;
  const fetchuser=()=>{
    setLoading(true);
    api
      .get("/api/users", {
        params: {
          size: pageSize,
          page: currentPage,
        },
      
      })
      .then((res) => {
        console.log(res.data);
        setUserss(res.data);
        message.success("muvaffiqiyatli bajarildi");
      })
      .catch((e) => {
        console.log(e);
        message.error("xatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchuser()
  }, [currentPage]);
  if (!userss) {
    return (
      <div className="mx-auto mt-60">
        <Spin size="large" />
      </div>
    );
  }
  console.log(pageSize);

  return (
    <div className="w-full p-6 container  overflow-auto h-full ">
      <div className="flex items-center justify-between my-2 ">
        <h1 className="text-2xl font-bold">Kitobxon</h1>
        <EditUser setUser={setUser} user={user} />
        <ButtonAndForm fetchuser={fetchuser} />
      </div>
      <Table
        style={{
          width: "100%",
        }}
        
        size="middle"
        loading={loading}
        dataSource={userss.items}
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: userss.totalCount,
        }}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
        }}
        rowKey={"id"}
        columns={[
          {
            key: "id",
            dataIndex: "id",
            title: "Id",
            render: (id,item)=>{
              return <div onClick={()=>{
                setUser(item)
                
              }}>
                {id}
              </div>
            }
          },
          {
            key: "firstName",
            dataIndex: "firstName",
            title: "Name",
          },
          {
            key: "lastName",
            dataIndex: "lastName",
            title: "LastName",
          },
          {
            key: "phone",
            dataIndex: "phone",
            title: "Phone",
          },
          {
            key: "gender",
            dataIndex: "gender",
            title: "Gender",
          },
        ]}
      />
    </div>
  );
}

export default UsersPage;
