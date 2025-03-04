import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import { Spin, Table } from "antd";
import api from "../api/Api";

function BooksPage() {
  const [book, setBook] = useState();
  const state = useMyStore();
  useEffect(() => {
    api
      .get("/api/books", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setBook(res.data);
      });
  }, []);
  if (!book) {
    return <Spin />;
  }
  return (
    <div className="w-full overflow-auto p-6">
      <h2 className="font-bold text-2xl mb-2">Kitoblar</h2>
      <Table
      size="small"
        dataSource={book.items}
        rowKey={"id"}
        columns={[
          {
            key: "id",
            title: "id",
            dataIndex: "id",
          },
          {
            key: "name",
            title: "Kitob nomi",
            dataIndex: "name",
          },
          {
            key: "image",
            title: "Rasmi",
            dataIndex: "image",
            render:(image)=>{
              return <>
              <img width={50} src={image} alt="" />
              </>
            }
          },
          {
            key: "pages",
            title: "Sahifa soni",
            dataIndex: "pages",
          },
          {
            key: "price",
            title: "Narxi",
            dataIndex: "price",
            render:(price)=>{
              return <p>{price} so'm</p>
            }
          },
        ]}
      />
    </div>
  );
}

export default BooksPage;
