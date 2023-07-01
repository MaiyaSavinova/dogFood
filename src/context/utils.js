import { createContext } from "react";

export const initialValue = {
    setPrice: (el) => {
        return +(el.price * (1 - el.discount / 100)).toFixed(2)
    },
    setRating: (el, round = false) => {
    if (el.reviews.length === 0) {
        return 0
    } else {
        const result = el.reviews.reduce((acc, rev) => acc + rev.rating, 0) / el.reviews.length.toFixed(1)
        return round ? Math.round(result) : result;
    }
},
setDescription: (text) => {
    let str = "";
    const result = [];
    let separators = ["\r", "\n", ".", "!", "?"];
    for (let i = 0, cnt = text.length; i < cnt; i++) {
        if (separators.includes(text[i])) {
            result.push(str);
            str = "";
        } else {
            str += text[i];
        }
    }
    if (str) {
        result.push(str);
    }
    return result;
},
setStars: (n) => {
    const stars = [];
    let i = 0;
    while (i < n) {
        stars.push(<i className="lni lni-star-fill" key={i}/>)
        i++;
    }
    while (i < 5) {
        stars.push(<i className="lni lni-star-empty" key={i}/>)
        i++;
    }
    return stars;
}
}

const Utils = createContext(initialValue);
export default Utils;