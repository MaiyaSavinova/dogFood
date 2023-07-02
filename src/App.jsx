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
  const [screen, setScreen] = useState(window.innerWidth);
  const [products, setProducts] = useState([]);
 
  let bStore = localStorage.getItem("rockBasket");
  if (bStore) {
      bStore = JSON.parse(bStore);
  } else {
      bStore = [];
  }
  const [basket, setBasket] = useState(bStore);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreen(window.innerWidth);
  })
  if (token) {
    api.getProducts()
        .then(data => {
            setProducts(data.products);
        })
}
}, []);

useEffect(() => {
  if (token) {
      api.getProducts()
          .then(data => {
            //let changes = blackList.changeTags;
            //let changesNames = Object.keys(changes);
            const arr = data.products;
            /*const result = utilsVal.filterPro(arr)
            .byAuthor(blackList.authors, false)
            .byTag(blackList.tags, false)
            .byId(blackList.goods, false)
            .data
        setProducts(result);*/
          })
  } else {
      setProducts([]);
  }
}, [api])


useEffect(() => {
  if (token) {
      fetch("https://api.react-learning.ru/products", {
          headers: {
              "Authorization": `Bearer ${token}`
          }
      })
          .then(res => res.json())
          .then(data => {
              console.log(data);
              setProducts(data.products);
          })
  }
}, [token])

  useEffect(() => {
    setApi(new Api(token))
  }, [token])

  useEffect(() => {
    localStorage.setItem("rockBasket", JSON.stringify(basket));
}, [basket])

  useEffect(() => {
    setToken(localStorage.getItem("user-token"))
  }, [userId])

  const mainCtx = {
    api,
    userId,
    setUserId,
    products,
    setProducts,
    basket,
    setBasket
   
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