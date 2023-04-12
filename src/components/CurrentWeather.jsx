import { Alert, Button, Container } from "react-bootstrap";
import styles from "./CurrentWeather.module.css";
import { useContext, useRef, useState } from "react";
import { FavoriteContext } from "../store/AddToFavorite/context";
import { addToFavorite } from "../store/AddToFavorite/actions";
import { getCurrentWeatherEndpoint } from "../api/endpoints";
import useFetchHook from "../utils/useFetchHook";
import {
  getCurrentWeather,
  getDate,
  getDayOfWeek,
  getHour,
  getWeatherIcon,
  windToKmPerHour,
} from "../api/adaptors";

import { Link } from "react-router-dom";
import { ThemeContext } from "../store/ChangeTheme/context";
import { setRainyTheme, setSunnyTheme } from "../store/ChangeTheme/actions";

function CurrentWeather() {
  const [city, setLocation] = useState("Oradea");
  const [updatedCity, setUpdatedCity] = useState(city);
  const [stateAlert, setStateAlert] = useState(false);
  const { favDispatch } = useContext(FavoriteContext);
  const { themeState, themeDispatch } = useContext(ThemeContext);
  const inputRef = useRef(null);

  const cityWeatherEndpoint = getCurrentWeatherEndpoint(updatedCity);
  const cityWeather = useFetchHook(cityWeatherEndpoint);
  // console.log(cityWeather);
  const currentWeather = getCurrentWeather(cityWeather);
  // console.log(currentWeather);

  const { id, name, dt, temp, tempFeels, description, icon, wind } =
    currentWeather;
  const weatherIcon = getWeatherIcon(icon);
  const windKmPerHour = Math.round(windToKmPerHour(wind));
  const temperature = Math.round(temp);
  const temperatureFeels = Math.round(tempFeels);
  const day = getDayOfWeek(dt);
  const hour = getHour(dt);
  const dateYear = getDate(dt);
  // console.log(dateYear);

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

  function handleAddFavorite(city) {
    const actionResult = addToFavorite(city);
    favDispatch(actionResult);

    setStateAlert(true);
    setTimeout(() => {
      setStateAlert(false);
    }, 2500);
  }

  function handleChangeTheme() {
    let actionResult;
    if (themeState.theme === "rainy") {
      actionResult = setSunnyTheme();
    } else {
      actionResult = setRainyTheme();
    }
    themeDispatch(actionResult);
  }

  return (
    <div
      className={
        themeState.theme === "rainy" ? `${styles.rainy}` : `${styles.sunny}`
      }
    >
      <div className={styles.background}>
        {stateAlert && (
          <Alert className={styles.alert}>Ai adaugat oraşul la favorite</Alert>
        )}
        <div className={styles.content}>
          <section className="d-flex">
            <Button className={styles.theme} onClick={handleChangeTheme}>
              <span className={` material-icons text-light`}>sunny</span>
            </Button>
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
          {cityWeather && cityWeather.cod === 200 ? (
            <div>
              <section>
                <Container className={styles.currentWeather}>
                  <img
                    src={weatherIcon}
                    className={styles.image}
                    alt="pozaIcon"
                  />
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
                        dt: dateYear,
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
                  <h5>{dateYear}</h5>
                  <h5>
                    {day}, {hour}
                  </h5>
                  <h5>{description}</h5>
                  <h5>Temperatura resimţită {temperatureFeels} °C</h5>
                  <h5>Vânt {windKmPerHour} km/h</h5>
                </Container>
                <Link
                  to="/forecast"
                  variant="light"
                  className={styles.forecastBtn}
                >
                  Prognoza pe 5 zile
                </Link>
              </section>
            </div>
          ) : (
            <h2 className="mt-4">Oraşul nu există</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
