import React from "react";
import NumberFormat from "react-number-format";

const CompanyProfile = props => {
  const { company, prevPrice, keyStat } = props;

  return (
    <div className="company">
      <h2 className="company_title">
        <span className="company_symbol">{company.symbol}</span>
        <span className="company_name">{company.companyName}</span>
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
            <tr>
              <td className="company_stat-left">Volume</td>
              <td className="company_stat-right"><NumberFormat 
                displayType={"text"}
                value={prevPrice.volume}
                decimalScale={2}
                thousandSeparator={true}
                className="" />
              </td>
            </tr>
            <tr>
              <td className="company_stat-left">Open</td>
              <td className="company_stat-right"><NumberFormat 
                displayType={"text"}
                value={prevPrice.open}
                decimalScale={2}
                thousandSeparator={true}
                className="" />
              </td>
            </tr>
            <tr>
              <td className="company_stat-left">Market Cap</td>
              <td className="company_stat-right"><NumberFormat 
                displayType={"text"}
                value={keyStat.marketcap}
                decimalScale={2}
                thousandSeparator={true}
                className="" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      
    </div>
  )
}

export default CompanyProfile;