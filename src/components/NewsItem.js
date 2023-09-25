import React from 'react'
import './NewsItem.css';

const NewsItem = (props) => {
  return (
    <div className="card my-2" style={{ background: props.mode === 'light' ? 'white' : 'black', color: props.mode === 'light' ? 'black' : 'white', border: `0.01px solid ${props.mode === 'light' ? '#808080' : 'white'}` }}>
      <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
        style={{ left: '50%', zIndex: '1' }}>
        {props.source}
      </span>
      <img src={props.imageUrl} className="card-img-top" alt="Not available" />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title"><strong>{props.title}</strong></h5>
        <p className="card-text mb-4">{props.description}</p>
        <p className="card-text">
          <strong>Author:</strong> {props.author}<br /><strong>Time:</strong> {new Date(props.time).toGMTString()}
        </p>
        <a href={props.newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary mt-auto align-self-start"><strong>Read more</strong></a>
      </div>
    </div>
  );

}

export default NewsItem;