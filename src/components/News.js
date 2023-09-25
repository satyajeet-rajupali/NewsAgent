import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: "8",
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.string,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      articlesLength: 0,
      totalPages: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30);
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({ articles: parsedData.articles, articlesLength: parsedData.articles.length, totalResults: parsedData.totalResults, totalPages:Math.ceil(parsedData.totalResults/this.props.pageSize), loading: false });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.updateNews();
    this.setState({
      page: this.state.page + 1
    });
  }

  handlePrevClick = async () => {
    this.updateNews();
    this.setState({
      page: this.state.page - 1
    });
  }

  fetchMoreData = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({
      page: this.state.page + 1
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: this.state.articles.concat(parsedData.articles), articlesLength: this.state.articlesLength + parsedData.articles.length, totalResults: parsedData.totalResults});
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsAgent - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.page <= this.state.totalPages}
          loader={<Spinner />}
        >
          <div className='container'>
            
            <div className='row'>
              {this.state.articles.map(({ title, description, url, urlToImage, author, publishedAt, source }) => {
                return <div className='col-md-3 mb-3 d-flex align-items-stretch' key={url}>
                  <NewsItem
                    title={title ? title : ""}
                    description={description ? description : ""}
                    imageUrl={urlToImage ? urlToImage : "https://react.semantic-ui.com/images/wireframe/image.png"}
                    newsUrl={url}
                    author={author ? author : "unknown"}
                    time={publishedAt ? publishedAt : "unknown"}
                    source={source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;