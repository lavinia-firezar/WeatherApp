import { useRef, useState } from "react";
import Layout from "../components/Layout";
import styles from "./Forecast.module.css";
import { getForecastEndpoint } from "../api/endpoints";
import useFetchHook from "../utils/useFetchHook";
import { getForecast } from "../api/adaptors";
import { Button, Container } from "react-bootstrap";
import DailyForecastList from "../components/DailyForecastList";

function Forecast() {
  const [city, setLocation] = useState("Oradea");
  const [updatedCity, setUpdatedCity] = useState(city);
  const inputRef = useRef(null);

  const cityForecastEndpoint = getForecastEndpoint(updatedCity);
  const cityForecast = useFetchHook(cityForecastEndpoint);
  const forecastWeather = getForecast(cityForecast);
  console.log(cityForecast);
  const forecastDetails = forecastWeather.map((forecast) => {
    return [forecast, forecast.dt];
  });
  // console.log(forecastDetails);

  function handleChangeInput(event) {
    event.preventDefault();
    setLocation(event.target.value);
  }

  function handleOnClick(event) {
    if (!updatedCity) {
      setLocation("Oradea");
    } else {
      event.preventDefault();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setUpdatedCity(city);
    }
  }

  return (
    <Layout>
      <section className={styles.background}>
        <Container className={styles.content}>
          <div>
            <input
              type="text"
              onChange={handleChangeInput}
              className={styles.locationSearch}
              placeholder="Caută vremea"
              ref={inputRef}
            ></input>
            <Button id={styles.searchButton} onClick={handleOnClick}>
              <span className="material-icons text-dark">search</span>
            </Button>
          </div>
          {cityForecast && cityForecast.cod === "200" ? (
            <div>
              <h2>Prognoza meteo pe 5 zile în oraşul {updatedCity}</h2>
              <DailyForecastList forecastDetails={forecastDetails} />
            </div>
          ) : (
            <h2>Oraşul nu există</h2>
          )}
        </Container>
      </section>
    </Layout>
  );
}

export default Forecast;
