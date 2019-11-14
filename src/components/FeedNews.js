import React, { useEffect, useState } from "react";
import News from "./News";

import { fetchNews } from "../api/fetchCloud";

const FeedNews = props => {
  const [ apple, setApple ] = useState([]);
  const [ google, setGoogle ] = useState([]);
  const [ facebook, setFacebook ] = useState([]);


  const onFetchNews = async symbol => {
    const response = await fetchNews(symbol);
    if (response) return response;
    return null;
  }

  useEffect(() => {
    Promise.all([onFetchNews("aapl"), onFetchNews("googl"), onFetchNews("fb")]).then(
      data => {
       const [appleF, googleF, facebookF] = data;
       setApple(appleF);
       setGoogle(googleF);
       setFacebook(facebookF);
      }
    );
  }, [])

  return (
    <div>
      {apple && (
        <div className="apple">
          <h2>Apple, Inc.</h2>
          <div className="news">
            {apple.map(data => <News news={data} /> )}
          </div>
        </div>
      )}
      {google && (
        <div className="google">
          <h2>Alphabet</h2>
          <div className="news">
            {google.map(data => <News news={data} /> )}
          </div>
        </div>
      )}
      {facebook && (
        <div className="facebook">
          <h2>Facebook</h2>
          <div className="news">
            {facebook.map(data => <News news={data} /> )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedNews;
