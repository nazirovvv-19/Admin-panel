import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import Categories from "../pages/Categories";
import RentsPage from "../pages/RentsPage";
import UsersPage from "../pages/UsersPage";

function MainSection() {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/rents" element={<RentsPage/>}/>
        <Route path="/user" element={<UsersPage/>}/>
        
      </Routes>
     
   
  );
}

export default MainSection;
