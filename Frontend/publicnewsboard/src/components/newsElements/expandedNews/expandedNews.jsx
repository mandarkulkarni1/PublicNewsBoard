import { React } from 'react';

const ExpandedNews = (props) => {
    const {title,url,article,city} = props.news;
  return (
    <React.Fragment>
      <div class="card bg-dark text-white">
        <img
          src="https://mdbootstrap.com/img/new/slides/017.jpg"
          className="card-img"
          alt="..."
        />
        <div className="card-img-overlay">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {article}
          </p>
          <p className="card-text">{city}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExpandedNews;
