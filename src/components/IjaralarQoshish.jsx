import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import api from "../api/Api";

function IjaralarQoshish() {
  const [loading, SetLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [isOPen, setIsOPen] = useState(false);

  useEffect(() => {
    api.get(`api/users`).then((res) => {
      setUsers(res.data.items);
      console.log(res.data.items);
    });

    api
      .get("api/stocks", {
        params: {
          "filters[busy]": false,
        },
      })
      .then((res) => {
        setStocks(res.data.items);
      });
  }, []);

  return (
    <div>
      <Button
        type=""
        onClick={() => {
          setIsOPen(true);
        }}
      >
        Qoshish
      </Button>

      <Drawer
        open={isOPen}
        onClose={() => {
          setIsOPen(false);
        }}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(value) => {
            SetLoading(true);
            api
              .post(`api/rents`, { ...value })
              .then((res) => {
                console.log(res.data);

                message.success("Qoshildi");
              })
              .catch((e) => {
                message.error(e.response.data.message);
                console.error(e.response.data);
              })
              .finally(() => {
                SetLoading(false);
              });
          }}
        >
          <Form.Item label="Kitobxonlar " name={"userId"}>
            <Select
              showSearch
              placeholder="Kitobxonlar"
              options={users.map((item) => {
                return { value: item.id, label: item.firstName };
              })}
            />
          </Form.Item>

          <Form.Item label={"Kitob qoshish"} name={"stockId"}>
            <Select
              showSearch
              placeholder="Kitob Qoshish"
              options={stocks.map((item) => {
                return { value: item.id, label: item.book.name };
              })}
            />
          </Form.Item>

          <div className="flex gap-2">
            <Form.Item
              label="Topshirilgan Sana "
              name={"leasedAt"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="date" name="lastedAt" />
            </Form.Item>

            <Form.Item
              label="Topshirilgan Sana "
              name={"returningDate"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="date" name="lastedAt" />
            </Form.Item>
          </div>

          <Button loading={loading} type="primary" htmlType="submit">
            {loading ? "Saqlanmoqda " : "Saqlash"}
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default IjaralarQoshish;
