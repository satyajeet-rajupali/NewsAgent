import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import "./News.css"

const News = (props) => {


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [_, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setTotalPages(Math.ceil(parsedData.totalResults / props.pageSize));
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}><strong>NewsAgent - Top {capitalizeFirstLetter(props.category)} Headlines</strong></h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={page <= totalPages}
        loader={<Spinner />}
      >
        <div className='container'>

          <div className='row'>
            {articles.map((item) => {
              return <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xll-4 mb-3 d-flex align-items-stretch' key={item.url}>
                <NewsItem
                  title={item.title ? item.title : ""}
                  description={item.description ? item.description : ""}
                  imageUrl={item.urlToImage ? item.urlToImage : "https://react.semantic-ui.com/images/wireframe/image.png"}
                  newsUrl={item.url}
                  author={item.author ? item.author : "unknown"}
                  time={item.publishedAt ? item.publishedAt : "unknown"}
                  source={item.source.name? item.source.name: ""} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: "8",
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.string,
  category: PropTypes.string
}

export default News;