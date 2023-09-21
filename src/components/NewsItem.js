import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className="card my-2" style={{ width: "18rem" }}>
        <img src={imageUrl} className="card-img-top" alt="Not available" />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text mb-4">{description}</p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary mt-auto align-self-start">Read more</a>
        </div>
      </div>
    );
  }
}

export default NewsItem;