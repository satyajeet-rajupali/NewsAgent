import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

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

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d449557f508746e99e44a70d86d2237f&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
  }

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d449557f508746e99e44a70d86d2237f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false
      });
    }
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d449557f508746e99e44a70d86d2237f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false
    });
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className=''>NewsAgent - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map(({ title, description, url, urlToImage, author, publishedAt, source }) => {

            return <div className='col-md-3 mb-3 d-flex align-items-stretch' key={url}>
              <NewsItem
                title={title ? title : ""}
                description={description ? description : ""}
                imageUrl={urlToImage ? urlToImage : "https://react.semantic-ui.com/images/wireframe/image.png"}
                newsUrl={url}
                author={author ? author : "unknown"}
                time={publishedAt ? publishedAt : "unknown"} 
                source={source.name}/>
            </div>
          })}

        </div>
        <div className='container d-flex justify-content-between'>
          <button type="button" className="btn btn-dark" onClick={this.handlePrevClick} disabled={this.state.page <= 1}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;