import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";

function IjaralarQoshish() {
  const [isOPen, setIsOPen] = useState(false);
  return (
    <div>
      <Button
        type="primary"
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
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
          }}
        >
          <Form.Item
            label={"Kitobxon"}
            name={"name"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={"Kitob zaxirasi"}>
            <div className="flex gap-1">
              <Select
                style={{
                  width: 700,
                }}
              />
              <Select />
            </div>
          </Form.Item>
          <Form.Item
            label={"maxsus raqam"}
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
          <Button htmlType="submit" type="primary">
            Qoshish
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default IjaralarQoshish;
