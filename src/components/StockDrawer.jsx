import { Button, Drawer, Form, Input, message, Select, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../store/my-store";

function StockDrawer() {
  const [isOpenDrawer, setIsOpendrawer] = useState(false);
  const [loading, setLoaing] = useState(false);
  const [books, setBooks] = useState();
  const state = useMyStore();
  useEffect(()=>{
    axios.get("https://library.softly.uz/api/books" ,{
        
        headers:{
            Authorization:'Bearer ' + state.token
        }
        
    }).then((res) => {
   console.log(res.data.items);
   setBooks(res.data.items)
   message.success('booksda xatolik yoq')
 }).catch((e)=>{
   console.log(e);
   message.error('booksda xatoolik')
   
 })
},[])
if (!books) {
    return <Spin/>
}
  return (
    <div className="h-full">
      <Button
        type="primary"
        onClick={() => {
          setIsOpendrawer(true);

        }}
      >
        Kitob qoshish
      </Button>
      <Drawer
        open={isOpenDrawer}
        onClose={() => {
          setIsOpendrawer(false);
        }}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            setLoaing(true);
            console.log(values);
            axios
              .post("https://library.softly.uz/api/stocks", values, {
                headers: {
                  Authorization: "Bearer " + state.token,
                },
              })
              .then((res) => {
                console.log(res.data);
                message.success("qoshildi");
                setIsOpendrawer(false);
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
          
          <Form.Item label={"Kitob"} name={"bookId"}>
            <Select placeholder="Kitob" options={
                books.map(item=>{
                    return{label:item?.name,value:item?.id}
                })
            } />
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

export default StockDrawer;
