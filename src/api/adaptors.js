export function getCurrentWeather(apiResponse) {
  if (!apiResponse) {
    return {};
  }

  const detailsWeather = {
    id: apiResponse.id,
    name: apiResponse.name,
    dt: apiResponse.dt,
    temp: apiResponse.main.temp,
    tempFeels: apiResponse.main.feels_like,
    description: apiResponse.weather[0].description,
    icon: apiResponse.weather[0].icon,
    wind: apiResponse.wind.speed,
  };
  return detailsWeather;
}

export function getForecast(apiResponse) {
  if (!apiResponse) {
    return [];
  }

  const detailsForecast = apiResponse.list;

  const dailyForecastData = detailsForecast.filter((forecast, index) => {
    return index % 8 === 0;
  });

  return dailyForecastData;
}

export function getWeatherIcon(iconCode) {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function windToKmPerHour(metersPerSec) {
  return (metersPerSec * 3600) / 1000;
}

export function getDayOfWeek(utc) {
  const date = new Date(utc * 1000);
  const dayIndex = date.getDay();
  let day;

  switch (dayIndex) {
    case 0:
      day = "Duminica";
      break;
    case 1:
      day = "Luni";
      break;
    case 2:
      day = "Marti";
      break;
    case 3:
      day = "Miercuri";
      break;
    case 4:
      day = "Joi";
      break;
    case 5:
      day = "Vineri";
      break;
    case 6:
      day = "Sambata";
      break;
    default:
      day = "unknown day";
  }

  return day;
}

export function getHour(utc) {
  const date = new Date(utc * 1000);
  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${hour}:${minutes}`;
}
