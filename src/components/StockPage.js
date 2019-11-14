import React, { useState, useEffect } from "react";
import { fetchKeyStat, fetchCompany, fetchPrevPrice, fetchHistory, fetchNews } from "../api/fetchCloud";

import CompanyProfile from "./CompanyProfile";
import Graph from "./Graph";
import Favorite from "./Favorite";
import News from "./News";
import { LOCAL_FAV, STOCK_LIST } from "./constant";

const StockPage = () => {
  const [stock, setStock] = useState();
  const [keyStat, setKeyStat] = useState();
  const [company, setCompany] = useState();
  const [news, setNews] = useState();

  const [prevPrice, setPrevPrice] = useState();
  const [historyData, setHistoryData] = useState();
  const [time , setTime] = useState();
  const [isFound, setIsFound] = useState(true);

  const [favList, setFavList] = useState([]);
  const [isFave, setIsFave] = useState(false);

  const onFetchKeyStat = async symbol => {
    const response = await fetchKeyStat(symbol);

    if (response) return response;
    return null;
  }

  const onFetchCompany = async symbol => {
    const response = await fetchCompany(symbol);
    if (response) return response;
    return null;
  }

  const onFetchNews = async symbol => {
    const response = await fetchNews(symbol);
    if (response) return response
    return null;
  }

  const onFetchPrevPrice = async symbol => {
    const response = await fetchPrevPrice(symbol);
    if (response) return response;
    return null;
  }

  const onFetchHistory = async (stock, time="1m") => {
    const response = await fetchHistory(stock, time);

    if (response) return response;
    return null;
  }

  const onClickSearch = async symbol => {
    setIsFound(true);
    setIsFave(false);
    setStock(symbol);

    const companyStat = await onFetchKeyStat(symbol);
    if (!companyStat) return setIsFound(false);

    const companyPrev = await onFetchPrevPrice(symbol); 
    if (!companyPrev) return setIsFound(false);

    const companyProfile = await onFetchCompany(symbol);
    if (!companyProfile) return setIsFound(false);

    const companyHistory = await onFetchHistory(symbol);
    if (!companyHistory) return setIsFound(false);

    const companyNews = await onFetchNews(symbol);
    if (!companyNews) return setIsFound(false);

    if (companyProfile && companyPrev && companyProfile) {
      setKeyStat(companyStat);
      setCompany(companyProfile);
      setPrevPrice(companyPrev);
      setHistoryData(companyHistory);
      setNews(companyNews);
      if (favList) {
        favList.map(data => data === symbol ? setIsFave(true) : "");
      }
    };
    
  }

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_FAV));

    if (local !== undefined) {
      setFavList(local);
    }
  }, [])

  const onClickFav = symbol => {
    let favTemp = [];
    let isFav = false;
    let indexFav = 0;
    if (favList) {
      favTemp = [...favList];
      favList.map((fav, index) => {
        if (symbol === fav) {
          indexFav = index
          isFav = true
        };
      });
    }

    if (!isFav) {
      favTemp.push(symbol);
    } else {
      favTemp.splice(indexFav , 1);
    }

    setIsFave(!isFave)
    setFavList(favTemp);
    localStorage.setItem(LOCAL_FAV, JSON.stringify(favTemp));
  }


  return (
    <div className="home-page">
      <Favorite
        faves={favList}
        onClickSearch={onClickSearch}
      />
      <div className="dropdown">
          <select onChange={e => onClickSearch(e.target.value)} className="select">
            <option selected disabled>Please Select Stock</option>
            {STOCK_LIST.map(data => <option value={data.symbol} key={data.symbol}>{data.name}</option>)}
          </select>
      </div>

      {!isFound && <h2>{stock.toUpperCase()} is not found !! please try agian.</h2>}
      { keyStat && company && prevPrice &&
        <CompanyProfile 
          company={company}
          prevPrice={prevPrice}
          keyStat={keyStat}
          isFave={isFave}
          setIsFave={onClickFav}
        />
      }
      { historyData && <Graph historyData={historyData} /> }
      
        { news && (
            <div className="news">
              {news.map(data => <News news={data} /> )}
            </div>
          )
        }
      
    </div>
  )
}

export default StockPage;