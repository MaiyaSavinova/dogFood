import { useContext, useEffect } from "react";

import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Adds from "../components/Adds";
import Carousel from "../components/Carousel";
import Card from "../components/Card";

import MainCtx from "../context/main";

import bannersData from "../assets/data/banners.json";
import addsData from "../assets/data/adds.json";
//import goodsData from "../assets/data/goods.json";


export function Home() {
      const { products, screen } = useContext(MainCtx);
      const favGoods = products.filter(el => el.reviews.length !== 0).sort((a,b) => {
            const aSum = a.reviews.reduce((acc, el) => acc + el.rating, 0) /
            a.reviews.length; 
            const bSum = b.reviews.reduce((acc, el) => acc + el.rating, 0) /
            b.reviews.length;
            return bSum - aSum;
      }).slice(0, screen < 1064 ? 2 : 4);
      const newGoods = [...products].sort((a,b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        }).slice(0, screen < 1064 ? 2 : 4);
        
        useEffect(() => {        
console.log(products);
        },[products]
        ) 
      return <>

            <Banner {...bannersData[1]} pattern={false} bgPos="50% 40%"/>
            <Layout dt={3}>
                  <Adds {...addsData[3]}></Adds>
            </Layout>
            {newGoods.length > 0 && <Layout mb={2} dt={4} title="Новинки">
                        {newGoods.map(el => <Card key={el._id} {...el}/>)}
            </Layout>}
            <Layout dt={2}>
                  <Adds {...addsData[2]}></Adds>
                  <Adds {...addsData[4]} />
            </Layout>
                  {favGoods.length > 0 && <Layout mb={2} dt={4} title="Популярные товары">
                        {favGoods.map(el => <Card key={el._id} {...el}/>)}
            </Layout>}
            <Layout dt={2}>
                  <Adds {...addsData[0]} />
                  <Adds {...addsData[1]}></Adds>
            </Layout>
            {products.length > 0 && <Layout mb={2} dt={4} title="Недавно просмотренные">
            {products.map(el => <Card key={el._id} {...el}/>).slice(0, screen < 1064 ? 2 : 4)}
        </Layout>}

      </>
}