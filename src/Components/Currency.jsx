import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Currency.css";

function Currency() {
  const [data, setData] = useState({});

  const apiKey = "78376644c3ec4d799710a67ae812f253";
  const currencyCode = "CAD, IDR, JPY, CHF, EUR, GBP";
  const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=${currencyCode}`;

  const getData = async () => {
    const data = await fetch(url);
    const result = await data.json();
    setData(result);
  };

  useEffect(() => {
    getData();
  }, []);

  const Buy = (rate) => {
    const buyNumber = Number(rate);
    const buyCalculate = buyNumber * 0.05;
    const buyFinal = (buyNumber + buyCalculate).toFixed(4);
    return buyFinal;
  };

  const Sell = (rate) => {
    const sellNumber = Number(rate);
    const sellCalculate = sellNumber * 0.05;
    const sellFinal = (sellNumber - sellCalculate).toFixed(4);
    return sellFinal;
  };

  return (
    <div className="container">
      <div>
        <table className="tables">
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {data.rates &&
              Object.entries(data?.rates).map(([key, value]) => (
                <tr>
                  <td>{key}</td>
                  <td>{Buy(value)}</td>
                  <td>{Number(value).toFixed(6)}</td>
                  <td>{Sell(value)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Currency;
