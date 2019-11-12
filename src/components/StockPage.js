import React, { useState } from "react";
import { fetchLastPrice } from "../api/fetchCloud";



const StockPage = props => {
  const [stock, setStock] = useState();
  const [lastPrice, setLastPrice] = useState();

  const onClickLastPrice = async symbol => {
    const response = await fetchLastPrice(symbol);

    console.log("lastprice ", response);
    setLastPrice(response);
    
  }

  return (
    <div className="main-page">
      <h2>Just Do It!</h2>
      <input
        type="text"
        placeholder="Please Stock Here!"
        onChange={e => setStock(e.target.value)}/> <br />
      <button onClick={() => onClickLastPrice(stock)}>Search Here</button>

      { lastPrice && <h2>{stock.toUpperCase()} last price : {lastPrice}</h2>}
    </div>
  )
}

export default StockPage;