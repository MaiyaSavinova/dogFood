import { useContext } from "react";

import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Adds from "../components/Adds";
import Carousel from "../components/Carousel";
import Card from "../components/Card";

import MainCtx from "../context/main";

import bannersData from "../assets/data/banners.json";
import addsData from "../assets/data/adds.json";
import goodsData from "../assets/data/goods.json";


export function Home() {
      const favGoods = goodsData.filter(el => el.reviews.length !== 0).sort((a,b) => {
            const aSum = a.reviews.reduce((acc, el) => acc + el.rating, 0) /
            a.reviews.length; 
            const bSum = b.reviews.reduce((acc, el) => acc + el.rating, 0) /
            b.reviews.length;
            console.log(aSum, bSum);
            return bSum - aSum;
      });
      const newGoods = [...goodsData].sort((a,b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        });
      return <>
            <Banner {...bannersData[1]} pattern={false} bgPos="50% 40%"/>
            <Layout dt={3}>
                  <Adds {...addsData[3]}></Adds>
            </Layout>
            {newGoods.length > 0 && <Layout dt={2} title="Новинки">
            <Card{...goodsData[0]}></Card>
            <Card{...goodsData[1]}></Card>
            </Layout>}
            <Layout dt={2}>
                  <Adds {...addsData[2]}></Adds>
                  <Adds {...addsData[4]} />
            </Layout>
                  {favGoods.length > 0 && <Layout dt={2} title="Популярные товары">
                  <Card{...goodsData[3]}></Card>
                  <Card{...goodsData[4]}></Card>
            </Layout>}
            <Layout dt={2}>
                  <Adds {...addsData[0]} />
                  <Adds {...addsData[1]}></Adds>
            </Layout>

      </>
}
