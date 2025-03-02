import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import Categories from "../pages/Categories";
import RentsPage from "../pages/RentsPage";
import UsersPage from "../pages/UsersPage";
import StocksPage from "../pages/StocksPage";
import BooksPage from "../pages/BooksPage";

function MainSection() {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/rents" element={<RentsPage/>}/>
        <Route path="/user" element={<UsersPage/>}/>
        <Route path="/stock" element={<StocksPage/>}/>
        <Route path="/book" element={<BooksPage/>}/>
        
      </Routes>
     
   
  );
}

export default MainSection;
