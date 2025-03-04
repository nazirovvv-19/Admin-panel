import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useMyStore from "../store/my-store";
import api from "../api/Api";

function ButtonAndForm({fetchuser}) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [loading, setLoaing] = useState(false);
  const state = useMyStore();
  return (
    <div className="h-full">
      <Button
        type="primary"
        onClick={() => {
          setIsOpenForm(true);
        }}
      >
        Add people
      </Button>
      <Drawer
        open={isOpenForm}
        onClose={() => {
          setIsOpenForm(false);
        }}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            setLoaing(true);
            console.log(values);
            api
              .post(
                "/api/users",
                { ...values, phone: values.phone.toString() },
               
              )
              .then((res) => {
                console.log(res.data);
                message.success("qoshildi");
                setIsOpenForm(false);
                fetchuser()
              })
              .catch((e) => {
                console.log(e);
                message.error("qoshishda xatolik");
              })
              .finally(() => {
                setLoaing(false);
              });
          }}
        >
          <Form.Item
            label={"ism"}
            name={"firstName"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"familya"}
            name={"lastName"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Nomer"}
            name={"phone"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label={"jinsi"}
            name={"gender"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group
              block
              options={[
                {
                  label: "erkak",
                  value: "male",
                },
                {
                  label: "ayol",
                  value: "female",
                },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} htmlType="submit" type="primary">
              qoshish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default ButtonAndForm;
