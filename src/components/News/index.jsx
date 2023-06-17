import "./index.css";

const News = ({data}) => {
    return <a 
    target="_blank"
    href={data.url}
    rel="noreferrer"
    className="new"
    >
    <img src={data.urlToImage} alt={data.title} className="news__img"/>
    <span className="news__content">
        <span className="news__title">{data.title}</span>
        <span className="news__date">{new Date(data.publishedAt).toLocaleDateString()}</span>
    </span>
    </a>
}
export default News;
