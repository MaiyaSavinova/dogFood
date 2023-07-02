import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import Layout from "../components/Layout";
import Product from "../components/Product";

import MainCtx from "../context/main";
import UtilsCtx from "../context/utils";
import Main from "../context/main";

function SingleProduct () {
    const {id} = useParams();
    const [count, setCount] = useState(0);
    const {api} = useContext(MainCtx);
    const {} = useContext(UtilsCtx);
    const { userId, token } = useContext(Main);
    const [product, setProduct] = useState({});
    const [text, setText] = useState("");
    const [revActive, setRevActive] = useState(false);

    const clickCountUp = () => {
        setCount(count + 1);
    }

    const clickCountDoWn = () => {
        if (count > 0) {
            setCount(count - 1);
        }

    }

    const clearForm = () => {
        setText("");
    }

    useEffect(() => {
        api.getProduct(id)
            .then(data => {
                console.log(data);
                setProduct(data);
            })
    }, [])

    useEffect(() => {
    }, [product])

    useEffect(() => {
        fetch(`https://api.react-learning.ru/products/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    console.log(data);
                    setProduct(data);
                }
            })
    }, []);

    const sendForm = (e) => {
        e.preventDefault();
        let body = {
            text: text
        }
        fetch(`https://api.react-learning.ru/products/review/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
        clearForm();
        setRevActive(false);
    }

    return <>
       {product.name && <Layout title={product.name} dt={2}>
            <div>
            {product.tags.length > 0 && <Product.Tags tags={product.tags}/>}
                <Product.Image
                    pictures={product.pictures}
                    name={product.name}
                /> 
            </div>
            <Product.Info {...product} setProduct={setProduct}/>
            <Product.Description description={product.description}/>
            <Product.Reviews reviews={product.reviews}/>
            
      <div className="wrapper__product maxwidth">             
                    <div className="product__block_left">
                        <h3>Отзывы</h3>
                        <button className="product__add-reviews font__bold transition"
                            onClick={() => setRevActive(true)}>Написать отзыв</button>
                            
                        {product.reviews.map((el, i) =>
                                <div className="product__block_left" key={i}>
                                    <h4>{el.author.name}</h4>
                                    <p>{el.text}</p>
                                    {}
                                    <hr />
                                </div>
                            )}
                    </div>
                </div>

            <div className="modal__reviews"
                style={{ display: revActive ? "flex" : "none" }}>
                <div className="reviews">
                    <button className="btn_close transition"
                        onClick={() => setRevActive(false)}>х</button>
                    <div className="reviews__product">
                        <p><img src={product.pictures} alt={product.name} className="reviews__img" /></p>
                        <div className="reviews__name">{product.name} </div>
                    </div>
                    <form onSubmit={sendForm}>
                        <label>
                            <h3>Ваш отзыв</h3>
                            <textarea
                                placeholder="Введите текст"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </label>
                        <button className="modal-link maxwidth_btn">Отправить</button>
                    </form>
                </div>
            </div>

</Layout> }
    </>
 }
 export {SingleProduct};