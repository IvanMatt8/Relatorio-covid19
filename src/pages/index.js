import React, { useEffect, useState } from "react";
import Header from "../components/Header/header";
import api from "../services/api";

import "./styles.css";

export default function Covid() {
  const [cases, setCases] = useState([]);
  const [countries, setCountries] = useState("BR");
  const [titleCountries, setTitleCountries] = useState();

  useEffect(
    () => {
      api.get(`countries/${countries}/confirmed`).then((response) => {
        setCases(response.data);
      });
    },
    [countries],
    [cases]
  );

  useEffect(() => {
    try {
      const redu = cases.reduce((a, obj) => obj.countryRegion);
      setTitleCountries(redu);
    } catch (error) {
      setTitleCountries("Nenhum país encontrado.");
    }
  }, [cases]);

  return (
    <div>
      <Header />

      <div className="top">
        <div className="top-h">
          <h1> COVID-19 </h1>
        </div>
        <div className="top-i">
          <h3>Digite o País </h3>

          <input
            placeholder="🔎"
            onChange={(e) => setCountries(e.target.value)}
          />
        </div>
      </div>

      <div className="title-countries">
        <p> {titleCountries} </p>
      </div>

      <div className="container-center">
        {cases.map((caso) => (
          <div key={caso.uid} className="container">
            <div className="card">
              <h2> {caso.provinceState}</h2>

              <div className="middle">
                <strong>Casos confimados</strong>
                <p>{caso.confirmed.toLocaleString()}</p>
                <strong>Cases ativos</strong>
                <p>{caso.active.toLocaleString()}</p>

                <strong>Fatalidades</strong>
                <p>{caso.deaths.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
