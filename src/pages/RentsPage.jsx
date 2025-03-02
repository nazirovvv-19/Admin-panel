import { Button, message, Spin, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import ButtonAndForm from "../components/ButtonAndForm";
import IjaralarQoshish from "../components/IjaralarQoshish";

function RentsPage() {
  const [ijaralar, setIjaralar] = useState();
  const state = useMyStore()
  const [hozirgiSahifa, setHozirgiSahifa] = useState(1)
  const [loading, setLoading] = useState(false)


  const sahifaSoni = 10
  useEffect(() => {
    setLoading(true)
    axios
      .get("https://library.softly.uz/api/rents", {
        params: {
          size: sahifaSoni,
          page: hozirgiSahifa,
        },
        headers: {
          Authorization:
            "Bearer "+state.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIjaralar(res.data);
        message.success("muvaffiqiyatli");
      })
      .catch((e) => {
        console.log(e);
        message.error("xatolik");
      }).finally(()=>{
        setLoading(false)
      })
  }, [hozirgiSahifa]);
  if (!ijaralar) {
    return <div>
      <Spin/>
    </div>
  }
  
  return (
    <div className="container mx-auto px-5 overflow-auto h-full">
      <div>
        <div className="flex items-center justify-between my-3 p-2 ">
            <h1 className="font-bold text-2xl">Rents Page</h1>
            <IjaralarQoshish/>
        </div>
        <div className="p-2">
          <Table
          loading={loading}
          size="middle"
          dataSource={ijaralar.items}
          pagination={{
              pageSize:sahifaSoni,
              current:hozirgiSahifa,
              total:ijaralar.totalCount
          }}
          onChange={(pagination)=>{
            setHozirgiSahifa(pagination.current)
        }}
          
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
            
            rowKey={'id'}
          />
        </div>
      </div>
    </div>
  );
}

export default RentsPage;
