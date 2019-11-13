import React, { useState } from "react";
import { fetchHistory } from "../api/fetchCloud";


import { rangeTime } from "./constant";
import Graph from "./Graph";


const History = props => {
  const [stock, setStock] = useState();
  const [historyData, setHistoryData] = useState();
  const [time , setTime] = useState();

  const [isFound, setIsFound] = useState(true);


  const onChangeInput = e => {
    setIsFound(true);
    setStock(e.target.value)
  }

  const onClickFetchHistory = async (stock, time) => {
    const response = await fetchHistory(stock, time);

    if (response) return setHistoryData(response);
    setIsFound(false);
  }

  
  return (
    <div className="home-page">
        <input type="text"
          placeholder="Please Stock Here for History"
          onChange={e => onChangeInput(e)}
          className="history-input" />
        <select onChange={e => setTime(e.target.value)} className="history-input" >
          <option value="" defaultValue>Select Range of History</option>
          {Object.values(rangeTime).map(
            (data, index) => <option value={data} key={index}>{data}</option>
            )}
        </select>
        <button onClick={() => onClickFetchHistory(stock, time)} className="history-input" >Search History</button>
        
        {historyData && <Graph historyData={historyData} />}
        {!isFound && <h2>{stock.toUpperCase()} is not found !! please try agian.</h2>}
    </div>
  )
};

export default History;
