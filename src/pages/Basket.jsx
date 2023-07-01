import { useContext } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import Main from "../context/main";

function Basket() {
    const {setProducts} = useContext(Main);
    return <>
    <Layout>
        <h1>Корзина</h1>
        <table>
            <thead>
                <tr>
                    <td>Изображение</td>
                    <td>Название</td>
                    <td>Количество</td>
                    <td>Цена</td>
                    <td>Скидка</td>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

    </Layout>
    </>
}
export { Basket };

