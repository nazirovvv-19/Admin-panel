import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useMyStore from "../store/my-store";

function EditUser({ user, setUser }) {
  const [loading, setLoaing] = useState(false);
  const state = useMyStore();
  return (
    <div className="h-full">

      <Drawer
        open={user ? true : false}
        onClose={() => {
          setUser(null);
        }}
        destroyOnClose
      >
        <Form
        
          layout="vertical"
          initialValues={user}
          onFinish={(values) => {
            setLoaing(true);
            console.log(values);

            axios
              .put(
                "https://library.softly.uz/api/users/" + user.id,
                { ...values, phone: values.phone.toString() },
                {
                  headers: {
                    Authorization: "Bearer " + state.token,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);
                message.success("O'zgartirildi");
                setUser(null);
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

export default EditUser;
