import { Button, message, Spin, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import ButtonAndForm from "../components/ButtonAndForm";
import IjaralarQoshish from "../components/IjaralarQoshish";
import EditRents from "../components/EditRents";
import api from "../api/Api";
import RentsBookidOvolish from "../components/RentsBookidOvolish";

function RentsPage() {
  const [ijaralar, setIjaralar] = useState();
  const state = useMyStore();
  const [hozirgiSahifa, setHozirgiSahifa] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editBook, setEditBook] = useState();
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState();

  const sahifaSoni = 10;
  function fetchRents() {
    setLoading(true);
    api
      .get("/api/rents", {
        params: {
          size: sahifaSoni,
          page: hozirgiSahifa,
        },
        headers: {
          Authorization: "Bearer " + state.token,
        },
      })
      .then((res) => {

        const books_id = res.data.items.map((item) => {
          return item.stock.bookId;
        });
        api
          .get("/api/books", {
            params: {
              id: books_id,
            },
          })
          .then((res) => {
            setBook(res.data.items);
          });
        setIjaralar(res.data);
        message.success("muvaffiqiyatli");
      })
      .catch((e) => {
        console.log(e);
        message.error(e.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
   fetchRents()
  }, [hozirgiSahifa]);
  
  if (!ijaralar) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

 

  return (
    <div className="container mx-auto px-5 overflow-auto h-full">
      <div>
        <div className="flex items-center justify-between my-3 p-2 ">
          <h1 className="font-bold text-2xl">Rents Page</h1>
          <EditRents
            editBook={editBook}
            setEditBook={setEditBook}
            fetchRents={fetchRents}
          />
          <IjaralarQoshish />
        </div>
        <div className="p-2">
          <Table
            loading={loading}
            size="middle"
            dataSource={ijaralar.items}
            pagination={{
              pageSize: sahifaSoni,
              current: hozirgiSahifa,
              total: ijaralar.totalCount,
            }}
            onChange={(pagination) => {
              setHozirgiSahifa(pagination.current);
            }}
            columns={[
              {
                key: "id",
                title: "ID",
                dataIndex: "id",
                render: (id, item) => {
                  return (
                    <div
                      onClick={() => {
                        setOpen(true);
                        setEditBook(item)
                      }}
                      
                    >
                      {id}
                    </div>
                  );
                },
              },
              {
                key: "leasedAt",
                title: "Berilgan sana",
                dataIndex: "leasedAt",
                render: (value) => {
                  return new Date(value).toLocaleString("ru", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                },
              },
              {
                key: "returningDate",
                title: "Qaytarilgan sana",
                dataIndex: "returningDate",
                render: (value) => {
                  return new Date(value).toLocaleString("ru", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                },
              },
              {
                key: "returnedAt",
                title: "Qaytgan",
                dataIndex: "returnedAt",
                render: (Checkbox) => {
                  if (Checkbox) {
                    return <Switch defaultChecked onChange={Checkbox} />;
                  } else {
                    return <Switch onChange={Checkbox} />;
                  }
                },
              },
              {
                key: "firstName",
                title: "Kitobxon",
                dataIndex: "user",
                render: (u) => {
                  return (
                    <p>
                      {u.firstName} {u.lastName}
                    </p>
                  );
                },
              },
              {
                key: "stock",
                title: "Zaxira kitob",
                dataIndex: "stock",
                render: (stock) => {
                  return <RentsBookidOvolish stock={stock} book={book} />;
                },
              },
            ]}
            rowKey={"id"}
          />
        </div>
      </div>
    </div>
  );
}

export default RentsPage;
