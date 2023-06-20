import { useContext } from "react";

import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Adds from "../components/Adds";
import Card from "../components/Card";

import MainCtx from "../context/main";

import bannersData from "../assets/data/banners.json";
import addsData from "../assets/data/adds.json";
import goodsData from "../assets/data/goods.json";
//import { Form } from "react-router-dom";


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
            <Banner {...bannersData[1]} />
            <Layout>
                  <Adds {...addsData[0]}></Adds>
            </Layout>
            {newGoods.length > 0 && <Layout mb={2} dt={4} title="Новинки">
                  {newGoods.map(el => <Card key={el._id} {...el}></Card>)}
            </Layout>}
            <Layout dt={2}>
                  <Adds {...addsData[1]}></Adds>
                  <Adds {...addsData[2]}></Adds>
            </Layout>
            {favGoods.length > 0 && <Layout mb={2} dt={4} title="Популярные товары">
                  {favGoods.map(el => <Card key={el._id} {...el}></Card>)}
            </Layout>}
            <Layout dt={2}>
                  <Adds {...addsData[3]} />
                  <Adds {...addsData[4]} />
            </Layout>
            {goodsData.length > 0 && <Layout mb={2} dt={4} title="Недавно просмотренные">
                  {goodsData.map(el => <Card key={el._id}{...el}></Card>)}
            </Layout>}
            <Layout>
                  <Adds {...addsData[0]} />
            </Layout>

      </>
}
