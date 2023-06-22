import {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";

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

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(localStorage.getItem("user-token"));
  const [userId, setUserId] = useState(localStorage.getItem("user-id"));
  const [api, setApi] = useState(new Api(token));
  const [screen, setScreen] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", () => {
        setScreen(window.innerWidth);
    })
}, []);
  
  useEffect(() => {
    setApi(new Api(token))
  }, [token])

  useEffect(() => {
    setToken(localStorage.getItem("user-token"))
  }, [userId])

  const mainCtx = {
    api,
    userId,
    setUserId,
    screen

  }

  return <Main.Provider value={mainCtx}>
    <Header/>
    <main>
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
      </main>
      <Footer/>
  </Main.Provider>

}

export default App;
