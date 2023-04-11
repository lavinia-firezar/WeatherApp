const API_KEY = "30faa1389b1f9794d1af6a0b0c354a2a";

export function getCurrentWeatherEndpoint(city) {
  const queryParams = `appid=${API_KEY}&q=${city}&aqi=no&units=metric&lang=ro`;

  return `https://api.openweathermap.org/data/2.5/weather?${queryParams}`;
}

export function getForecastEndpoint(city) {
  const queryParams = `appid=${API_KEY}&q=${city}&aqi=no&units=metric&lang=ro`;

  return `https://api.openweathermap.org/data/2.5/forecast?${queryParams}`;
}
