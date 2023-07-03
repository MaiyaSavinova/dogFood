const Reviews = ({
    reviews
}) => {

    console.log(reviews);
    return <div className="product__reviews">
        <h2 className="product__title">Отзывы</h2>
        {reviews.map((el, i) => <div key={i}>
        <h4>{el.author.name}</h4>
            <p className="reviews__text">{el.text}</p>
            <hr/>
        </div>)}
      
    </div>
}

export default Reviews;



