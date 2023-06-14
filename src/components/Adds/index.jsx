import { Link } from "react-router-dom";
import { Pug } from "../../assets/images";

import "./index/css";

/*Неполучился код
const Adds = ({
    name,
    img,
    text,
    tag
}) => {
    const imgStyle = {
        backgroundImage: `url(${Pug[img]})`
    }
    
    return <div className="adds">
       <div className="adds__text">
            <h3>{name}</h3>
            <p>{text}</p>
            <Link to={``}>Подробнее</Link>
        </div>
    <div className="adds__img style={}></div>
    </div>
}

export default Adds;