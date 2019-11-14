import React from "react";

const News = props => {
  const { news } = props;

  const extractDateInformation = timestamp => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return {
      day: date.getDay(),
      month: date.getMonth(),
      year: date.getFullYear()
    }
  }
  
  const {day, month, year} = extractDateInformation(news.datetime);

  return (
    <div class="example-2 card">
        <div class="wrapper" style={{ background: `url(${news.image}) center / cover no-repeat`}}>
          <div class="header">
            <div class="date">
              <span class="day">{day}</span>
              <span class="month">{month}</span>
              <span class="year">{year}</span>
            </div>
          </div>
          <div class="data">
            <div class="content">
              <span class="author">{news.source}</span>
              <h2 class="title"><a href={news.url}>{news.headline}</a></h2>
              <p class="text">{news.summary}</p>
              <a href={news.url} class="button">Read more</a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default News;
