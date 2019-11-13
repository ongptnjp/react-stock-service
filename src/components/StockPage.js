import React, { useState } from "react";
import { fetchKeyStat, fetchCompany, fetchPrevPrice} from "../api/fetchCloud";

import CompanyProfile from "./CompanyProfile";


const StockPage = props => {
  const [stock, setStock] = useState();
  const [keyStat, setKeyStat] = useState();
  const [company, setCompany] = useState();
  const [prevPrice, setPrevPrice] = useState();
  const [isFound, setIsFound] = useState(true);

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

  const onClickSearch = async symbol => {
    setIsFound(true);

    const companyStat = await onFetchKeyStat(symbol);
    if (!companyStat) return setIsFound(false);

    const companyPrev = await onFetchPrevPrice(symbol); 
    if (!companyPrev) return setIsFound(false);

    const companyProfile = await onFetchCompany(symbol);
    if (!companyProfile) return setIsFound(false);

    if (companyProfile && companyPrev && companyProfile) {
      setKeyStat(companyStat);
      setCompany(companyProfile);
      setPrevPrice(companyPrev);
    };
    
  }

  const onChangeInput = e => {
    setIsFound(true);
    setStock(e.target.value)
  }

  return (
    <div className="home-page">
      <input
        type="text"
        placeholder="Please Stock Here!"
        onChange={e => onChangeInput(e)}/> <br />
      <button onClick={() => onClickSearch(stock)}>Search</button>


      {/* { lastPrice && <h2>{stock.toUpperCase()} last price : {lastPrice}</h2>} */}
      { keyStat && company && prevPrice && 
        <CompanyProfile 
          company={company}
          prevPrice={prevPrice}
          keyStat={keyStat} />
      }
      {!isFound && <h2>{stock.toUpperCase()} is not found !! please try agian.</h2>}
      
    </div>
  )
}

export default StockPage;