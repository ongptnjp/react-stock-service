import React from "react";
import NumberFormat from "react-number-format";

const CompanyProfile = props => {
  const { company, prevPrice, keyStat, isFave, setIsFave } = props;

  const tableRowSet = (title, numberValue, className = "") => (
    <tr>
      <td className="company_stat-left">{title}</td>
      <td className="company_stat-right"><NumberFormat 
        displayType={"text"}
        value={numberValue}
        decimalScale={2}
        thousandSeparator={true}
        className={className} />
      </td>
    </tr>
  )

  return (
    <div className="company">
      <h2 className="company_title">
        <span className="company_symbol">{company.symbol}</span>
        <span className="company_name">{company.companyName}</span>
        <span className="material-icons" style={{cursor: "pointer"}} onClick={() => setIsFave(company.symbol)}>{isFave ? "favorite" : "favorite_border"}</span>
      </h2>
      <div className="company_price-common company_price-common-little">
        <p className="company_price-date">{`Data as of ${new Date(prevPrice.date).toDateString()}`}</p>
        <p className="company_price-resource">{company.exchange}</p>
      </div>

      <div className="company_price-common company_price-common-big2">
          <NumberFormat
            displayType={"text"}
            value={prevPrice.close} 
            decimalScale={2}
            thousandSeparator={true}
            prefix={"$"} 
            className="company_price-close"/>
          <NumberFormat 
            displayType={"text"}
            value={prevPrice.change}
            decimalScale={2}
            className="company_price-change" />

          <NumberFormat 
            displayType={"text"}
            value={prevPrice.changePercent}
            suffix={"%"}
            className="company_price-percent" />
      </div>
      <div className="company_stat">
        <table className="company_stat-table">
          <tbody>
            <tr>
              <td className="company_stat-left">
                Key Stats
              </td>
            </tr>
          </tbody>
          <tbody>
            {tableRowSet("Volume", prevPrice.volume)}
            {tableRowSet("Open", prevPrice.open)}
            {tableRowSet("Market Cap", keyStat.marketcap)}
          </tbody>
        </table>
        <table className="company_stat-table">
          <tbody>
            <tr>
              <td className="company_stat-left">
                Key Stats
              </td>
            </tr>
          </tbody>
          <tbody>
            {tableRowSet("EPS", keyStat.ttmEPS)}
            {tableRowSet("Beta", keyStat.beta)}
            {tableRowSet("PE Ratio", keyStat.peRatio)}
          </tbody>
        </table>
      </div>

      
    </div>
  )
}

export default CompanyProfile;