import  {Stick} from "../../assets/images";
import {Link} from "../Nav";

import "./index.css"

const Logo = ({
    position = "horizontal"
}) => {
    return <div className="logo">
        <Link
            path="/"
            title="DogFood"
            imgType="image"
            imgPath={Stick.logo}
            position={position}
        />
    </div>
}

export default Logo;