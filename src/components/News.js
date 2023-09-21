import React, { Component } from 'react'
import NewsItem from './NewsItem';

export class News extends Component {
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
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=d449557f508746e99e44a70d86d2237f&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
  }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d449557f508746e99e44a70d86d2237f&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1
      });
    }
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d449557f508746e99e44a70d86d2237f&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1
    });
  }

  render() {
    return (
      <div className='container my-3 '>
        <h2>NewsAgent - Top Headlines</h2>
        <div className='row'>
          {this.state.articles.map(({ title, description, url, urlToImage }) => {

            return <div className='col-md-3 mb-3 d-flex align-items-stretch' key={url}>
              <NewsItem title={title ? title : ""} description={description ? description : ""} imageUrl={urlToImage ? urlToImage : "https://react.semantic-ui.com/images/wireframe/image.png"} newsUrl={url} />
            </div>
          })}

        </div>
        <div className='container d-flex justify-content-between'>
          <button type="button" class="btn btn-dark" onClick={this.handlePrevClick} disabled={this.state.page <= 1}>&larr; Previous</button>
          <button type="button" class="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;