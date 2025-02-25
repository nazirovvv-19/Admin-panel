import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import Categories from "../pages/Categories";

function MainSection() {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/categories" element={<Categories/>}/>
      </Routes>
     
   
  );
}

export default MainSection;
