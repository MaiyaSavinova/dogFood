import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  About,
  AddProduct,
  Auth,
  Basket,
  Delivery,
  Home,
  Products,
  Profile,
  SingleProduct
} from "./pages"

import Main from "./context/main";
import Api from "./Api";
import menu from "./assets/data/menu.json";

import Layout from "./components/Layout";
import Nav from "./components/Nav;"


function App() {
  const [token, setToken] = useState(localStorage.getItem("user-token"));
  const [userId, setUserId] = useState(localStorage.getItem("user-id"));
  const [api, setApi] = useState(new Api(token));
  
  useEffect(() => {
    setApi(new Api(token))
}, [token])

useEffect(() => {
    setToken(localStorage.getItem("user-token"))
}, [userId])

const mainCtx = {
    api,
    userId,
    setUserId
}
  
  return <Main.Provider value={mainCtx}>
    <Layout>
      <Nav menu={menu.header}></Nav>
    </Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/category/:name" element={<Products isCat={true} />} />
      <Route path="/products/favorites" element={<Products isFav={true} />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/product/add" element={<AddProduct />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Main.Provider>
}

export default App;
