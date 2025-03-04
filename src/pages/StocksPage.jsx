import { CheckCircleTwoTone, ClockCircleTwoTone } from "@ant-design/icons";
import { message, Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StockDrawer from "../components/StockDrawer";
import useMyStore from "../store/my-store";
import api from "../api/Api";

function StocksPage() {
  const state = useMyStore();
  const [stock, setStock] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const pageSize = 10;
  const fetchUser = () => {
    setLoading(true);
    api
      .get("/api/stocks", {
        params: {
          size: pageSize,
          page: currentPage,
        },
        headers: {
          Authorization: "Bearer " + state.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStock(res.data);
        message.success("muvaffiqiyatli bajarildi");
      })
      .catch((e) => {
        console.log(e);
        message.error("xatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchUser();
  }, [currentPage]);
  if (!stock) {
    return (
      <div className="mx-auto mt-60">
        <Spin size="large" />
      </div>
    );
  }
  console.log(pageSize);

  return (
    <div className="w-full p-6 container  overflow-auto h-full select-none ">
      <div className="flex items-center justify-between my-2 ">
        <h1 className="text-2xl font-bold">Kitoblarim</h1>

        <StockDrawer fetchUser={fetchUser} />
      </div>

      <Table
        loading={loading}
        style={{
          width: "100%",
        }}
        size="middle"
        dataSource={stock.items}
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: stock.totalCount,
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
          },
          {
            key: "book",
            dataIndex: "book",
            title: "Kitoblarim",
            render: (book) => {
              return (
                <p>
                  {book?.id} {book?.name}
                </p>
              );
            },
          },
          {
            key: "busy",
            dataIndex: "busy",
            title: "Bandligi",
            render: (busy) => {
              return !busy ? (
                <CheckCircleTwoTone twoToneColor={"#52c41a"} />
              ) : (
                <ClockCircleTwoTone twoToneColor={"#eb2f96"} />
              );
            },
          },
        ]}
      />
    </div>
  );
}

export default StocksPage;
