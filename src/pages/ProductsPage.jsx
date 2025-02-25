import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ProductsPage() {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("https://67b81c5f2bddacfb2710fac7.mockapi.io/product")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
  }, []);

  if (!products) {
    return (
      <div className="m-auto flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
        <div className="w-16 h-16 border-4  border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="w-full h-160 overflow-scroll">
      <Table
        style={{
          width: "100%",
          // scrollBehavior:'smooth'
        }}
        dataSource={products}
        columns={[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "image",
            dataIndex: "image",
            key: "image",
            render: (image) => {
              return (
                <>
                  <img width={70} src={image} alt="" />
                </>
              );
            },
          },
          {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => `$${price}`,
          },
        ]}
      />
    </div>
  );
}

export default ProductsPage;
