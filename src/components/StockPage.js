import React, { useState, useEffect } from "react";
import { fetchKeyStat, fetchCompany, fetchPrevPrice, fetchHistory } from "../api/fetchCloud";

import CompanyProfile from "./CompanyProfile";
import Graph from "./Graph";
import Favorite from "./Favorite";
import { LOCAL_FAV } from "./constant";

const StockPage = props => {
  const [stock, setStock] = useState();
  const [keyStat, setKeyStat] = useState();
  const [company, setCompany] = useState();
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

    favList.map(data => data === symbol ? setIsFave(true) : "");

    const companyStat = await onFetchKeyStat(symbol);
    if (!companyStat) return setIsFound(false);

    const companyPrev = await onFetchPrevPrice(symbol); 
    if (!companyPrev) return setIsFound(false);

    const companyProfile = await onFetchCompany(symbol);
    if (!companyProfile) return setIsFound(false);

    const companyHistory = await onFetchHistory(symbol);
    if (!companyHistory) return setIsFound(false);

    if (companyProfile && companyPrev && companyProfile) {
      setKeyStat(companyStat);
      setCompany(companyProfile);
      setPrevPrice(companyPrev);
      setHistoryData(companyHistory);
    };
    
  }

  const onChangeInput = e => {
    setIsFound(true);
    setStock(e.target.value)
  }

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_FAV));

    if (local !== undefined) {
      console.log("local storage", local);
      setFavList(local);
    }
  }, [])

  const onClickFav = symbol => {
    let favListTemp = [...favList];
    let isFav = false;
    let indexFav = 0;
    favList.map((fav, index) => {
      if (symbol === fav) {
        indexFav = index
        isFav = true
      };
    });
    if (!isFav) {
      favListTemp.push(symbol);
    } else {
      favListTemp.splice(indexFav , 1);
    }

    console.log("fav List Temp", favListTemp);
    setIsFave(!isFave)
    setFavList(favListTemp);
    localStorage.setItem(LOCAL_FAV, JSON.stringify(favListTemp));
  }


  return (
    <div className="home-page">
      <Favorite
        faves={favList}
        onClickSearch={onClickSearch}
      />
      <input
        type="text"
        placeholder="Please Stock Here!"
        onChange={e => onChangeInput(e)}/> <br />
      <button onClick={() => onClickSearch(stock)}>Search</button>

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
      
    </div>
  )
}

export default StockPage;