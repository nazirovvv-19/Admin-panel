import React from "react";
import { Button, Card, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import useMyStore from "../store/my-store";
function LoginPage() {
  const [loading, setLoading] = useState(false);
  const auth= useMyStore()
  return (
      <>
      <h1 className="ml-170  mt-35 text-3xl font-semibold">Admin panel</h1>
      <div className="h-full flex justify-between mx-auto">
        <Card
          style={{
            width: 350,
            margin: "auto",
            marginTop: 30,
            // boxShadow:'0px 0px 30px 2px'
            border:'1px solid black'
          }}
        >
          <Form
            name="basic"
            onFinish={(values) => {
              console.log(values);
              setLoading(true);
              axios
                .post("https://library.softly.uz/auth/signin", values)
                .then((res) => {
                  console.log(res.data);
                  message.success("muvaffiqiyatli bajarildi");
                  setLoading(false);
                  // console.log(JSON.stringify(res));
                  
                  useMyStore.setState({
                    token: res.data.token,
                    users: res.data.user
                  })
                  localStorage.setItem('tokenn',JSON.stringify(res.data))

                })
                .catch((e) => {
                  console.log(e);
                  message.error("xatolik");
                  setLoading(false);
                });
               
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 5,
                  message: "Kamida 5 ta parol kirgizing  ",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
