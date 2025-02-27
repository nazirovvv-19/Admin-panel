import { Button, message, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import ButtonAndForm from "../components/ButtonAndForm";

function RentsPage() {
  const [ijaralar, setIjaralar] = useState();
  const state = useMyStore()
  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/rents", {
        params: {
          size: 20,
          page: 1,
        },
        headers: {
          Authorization:
            "Bearer "+state.token,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setIjaralar(res.data.items);
        message.success("muvaffiqiyatli");
      })
      .catch((e) => {
        console.log(e);
        message.error("xatolik");
      });
  }, []);
  
  return (
    <div className="container mx-auto px-5 overflow-auto h-full">
      <div>
        <div className="flex items-center justify-between my-3 p-2 ">
            <h1>Rents Page</h1>
        
        </div>
        <div className="p-2">
          <Table
          loading={!ijaralar?true :false}
            columns={[
              {
                key: "id",
                title: "ID",
                dataIndex: "id",
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
                key:'firstName',
                title:'Kitobxon',
                dataIndex:'user',
                render:(u)=>{
                    return <p>{u.firstName} {u.lastName}</p>
                }
              }
            ]}
            dataSource={ijaralar}
            rowKey={'id'}
          />
        </div>
      </div>
    </div>
  );
}

export default RentsPage;
