import {useContext, useEffect, useState} from "react";
import Layout from "../Layout";
import Logo from "../Logo";
import Nav from "../Nav";
import {Search} from "../Form";

import Main from "../../context/main"

import menu from "../../assets/data/menu.json";

import "./index.css";

const Header = () => {
    const {screen} = useContext(Main);
    const [showMenu, setShowMenu] = useState(false);
    const [cartCnt, setCartCnt] = useState(0);
    const {basket} = useContext(Main);

    useEffect(() => {
        setCartCnt(basket.reduce((acc, el) => acc + el.cnt, 0))
    }, [basket])
    
    return <header className="header">
        <Layout>
            <Logo/>
            <Search/>
            {screen < 1064
                ? <>
                    <button
                        className={`card__btn header__btn ${showMenu ? "header__btn_active" : ""}`}
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <i className="lni lni-menu"/>
                    </button>
                    <Nav menu={menu.header} position="vertical"/>
                </>
                : <Nav menu={menu.header}/>
            }
        </Layout>
    </header>
}

export default Header