import { Button, Drawer, Form, message, Select } from "antd";
import React from "react";
import api from "../api/Api";

function EditRents({ editBook, setEditBook,fetchRents }) {
  return (
    <div>
      <Drawer
        open={editBook ? true : false}
        onClose={() => {
          setEditBook(null);
        }}
      >
        <Form
          layout="vertical"
          initialValues={{
            ...editBook,
            leasedAt: editBook?.leasedAt.slice(0,10),
            returningDate: editBook?.returningDate.slice(0,10)
          }}
          onFinish={(values) => {
            api.put("/api/rents/" + editBook.id, values).then((res) => {
              console.log(values);
              fetchRents()
              console.log(res.data);
              message.success("ijaralar bolimida  ozgaartirildi");
             setEditBook(null)
            }).catch(e=>{
              console.log(e);
              message.error(e.response.data.message)
              
            })
          }}
        >
          <Form.Item label={"kitobxon"} name={"userId"} >
            <Select />
          </Form.Item>
          <Form.Item>
            <div className="flex gap-2">
              <Form.Item label={"Kitob zaxirasi"} name={'stockId'}>
                <Select
                  style={{
                    width: 200,
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Select
                  placeholder={"kitob raqami"}
                  style={{ width: 120, marginTop: 30 }}
                />
              </Form.Item>
            </div>
          </Form.Item>
        <Form.Item label={'Berilgan sana'} name={'leasedAt'}>
          <input type="date" />
        </Form.Item>
        <Form.Item label={'Qaytarilgan sana'} name={'returningDate'}>
          <input type="date" />
        </Form.Item>
          <Button htmlType="submit" type="primary">
            + Qoshish
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default EditRents;
