import Layout from "../components/Layout";
//import Card from "../components/card";
import Banner from "../components/Banner";


import bannersData from "../assets/data/banners.json";

function Home() {
   return <>
         <Banner {...bannersData[1]}/>
   </>
}
export { Home };