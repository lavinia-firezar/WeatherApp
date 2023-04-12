import { Alert, Button, Container } from "react-bootstrap";
import styles from "./CurrentWeather.module.css";
import { useContext, useRef, useState } from "react";
import { FavoriteContext } from "../store/AddToFavorite/context";
import { addToFavorite } from "../store/AddToFavorite/actions";
import { getCurrentWeatherEndpoint } from "../api/endpoints";
import useFetchHook from "../utils/useFetchHook";
import {
  getCurrentWeather,
  getDayOfWeek,
  getHour,
  getWeatherIcon,
  windToKmPerHour,
} from "../api/adaptors";

import { Link } from "react-router-dom";

function CurrentWeather() {
  const [city, setLocation] = useState("Oradea");
  const [updatedCity, setUpdatedCity] = useState(city);
  const [stateAlert, setStateAlert] = useState(false);
  const { favDispatch } = useContext(FavoriteContext);
  const inputRef = useRef(null);

  const cityWeatherEndpoint = getCurrentWeatherEndpoint(updatedCity);
  const cityWeather = useFetchHook(cityWeatherEndpoint);
  console.log(cityWeather);
  const currentWeather = getCurrentWeather(cityWeather);
  // console.log(currentWeather);

  const { id, name, dt, temp, tempFeels, description, icon, wind } =
    currentWeather;
  const weatherIcon = getWeatherIcon(icon);
  const windKmPerHour = Math.round(windToKmPerHour(wind));
  const temperature = Math.round(temp);
  const temperatureFeels = Math.round(tempFeels);
  const date = getDayOfWeek(dt);
  const hour = getHour(dt);

  function handleChangeInput(event) {
    event.preventDefault();
    setLocation(event.target.value);
  }

  function handleOnClick(event) {
    if (updatedCity.cod === "404") {
      setLocation("Oradea");
    } else {
      event.preventDefault();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setUpdatedCity(city);
    }
  }

  function handleAddFavorite(city) {
    const actionResult = addToFavorite(city);
    favDispatch(actionResult);

    setStateAlert(true);
    setTimeout(() => {
      setStateAlert(false);
    }, 2500);
  }

  return (
    <div className={styles.background}>
      {stateAlert && (
        <Alert className={styles.alert}>Ai adaugat oraşul la favorite</Alert>
      )}

      <div className={styles.content}>
        <section>
          <Container>
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
          </Container>
        </section>
        <section>
          <Container className={styles.currentWeather}>
            <img src={weatherIcon} className={styles.image} alt="pozaIcon" />
            <div>
              <span className={styles.grade}>{temperature} °C</span>
              <h2>{name}</h2>
            </div>
            <Button
              id={styles.favoriteButton}
              onClick={() => {
                handleAddFavorite({
                  id: id,
                  name: name,
                  dt: date,
                  hour: hour,
                  icon: weatherIcon,
                  description: description,
                  wind: windKmPerHour,
                  temp: temperature,
                });
              }}
            >
              <span className="material-icons text-light">favorite</span>
            </Button>
          </Container>
        </section>
        <section>
          <Container>
            <h5>
              {date}, {hour}
            </h5>
            <h5>{description}</h5>
            <h5>Temperatura resimţită {temperatureFeels} °C</h5>
            <h5>Vânt {windKmPerHour} km/h</h5>
          </Container>
          <Link to="/forecast" variant="light" className={styles.forecastBtn}>
            Prognoza pe 5 zile
          </Link>
        </section>
      </div>
    </div>
  );
}

export default CurrentWeather;
