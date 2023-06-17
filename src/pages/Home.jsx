import { useContext } from "react";

import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Adds from "../components/Adds";
import News from "../components/News";

import MainCtx from "../context/main";

import bannersData from "../assets/data/banners.json";
import addsData from "../assets/data/adds.json";


export function Home() {
      const { news } = useContext(MainCtx);
      return <>
            <Banner {...bannersData[1]} />
            <Layout>
                  <Adds {...addsData[0]}></Adds>
            </Layout>
            <Layout mb={2} dt={4}>
                 {news.lenght > 0 && news.map((el, i) => <News key={`new-${i}`} data={el}></News>)}
            </Layout>
            <Layout dt={2}>
                  <Adds {...addsData[1]}></Adds>
                  <Adds {...addsData[2]}></Adds>
            </Layout>

      </>
}
