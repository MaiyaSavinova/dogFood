import { useContext } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import Main from "../context/main";

const Basket = () => {
    const {basket, setBasket} = useContext(Main);
    const setPrice = ({price, cnt}) => {
        return price * cnt 
    }
    const sum = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price
    }, 0)
    const sale = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price 
    }, 0)
    const inc = (id) => {
        setBasket(prev => prev.map(el => {
            if (el.id === id) {
                el.cnt++;
            }
            return el;
        }))
    }
    const dec = (id, cnt) => {
        if (cnt === 1) {
            setBasket(prev => prev.filter(el => el.id !== id))
        } else {
            setBasket(prev => prev.map(el => {
                if (el.id === id) {
                    el.cnt--;
                }
                return el;
            }))
        }
    }
    return <>
        <h1>Корзина</h1>
        <table>
            <thead>
                <tr>
                    <td>Изображение</td>
                    <td>Название</td>
                    <td>Количество</td>
                    <td>Цена</td>
                </tr>
            </thead>
            <tbody>
                {basket.map(el => <tr key={el.id}>
                    <td>
                        <img src={el.img} alt={el.name} height="50"/>
                    </td>
                    <td>
                        <Link to={`/product/${el.id}`}>{el.name}</Link>
                    </td>
                    <td>
                        <button onClick={() => dec(el.id, el.cnt)}>-</button>
                        <span style={{padding: "0 10px"}}>{el.cnt}</span>
                        <button onClick={() => inc(el.id)}>+</button>
                    </td>
                    <td>{el.price * el.cnt}&nbsp;₽</td>
                </tr>)}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}>Итоговая сумма:</td>
                    {}
                    <td colSpan={3}>{sale.toFixed(2)} ₽</td>
                </tr>
            </tfoot>
        </table>
    </>
}
export { Basket };

