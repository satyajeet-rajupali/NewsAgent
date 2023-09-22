import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, time, source} = this.props;
    return (
      <div className="card my-2">
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
         style={{ left: '50%', zIndex: '1' }}>
          {source}
        </span>
        <img src={imageUrl} className="card-img-top" alt="Not available" />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text mb-4">{description}</p>
          <p className="card-text ">
            <small className="text-body-secondary mt-auto align-self-start">
              <strong>Author:</strong> {author}<br /><strong>Time:</strong> {new Date(time).toGMTString()}
            </small>
          </p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary mt-auto align-self-start">Read more</a>
        </div>
      </div>
    );
  }
}

export default NewsItem;