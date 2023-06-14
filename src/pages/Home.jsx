import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Adds from "./component/Adds";

import bannersData from "../assets/data/banners.json";
import addsData from "./assets/data/adds.json";


function Home() {
      return <>
            <Banner {...bannersData[1]} />
            <Layout>
                  <Adds {...addsData[0]}></Adds>
            </Layout>
            <Layout dt={2}>
                  <Adds {...addsData[1]}></Adds>
                  <Adds {...addsData[2]}></Adds>
            </Layout>

      </>
}
export { Home };