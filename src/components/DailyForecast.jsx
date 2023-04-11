import { getWeatherIcon } from "../api/adaptors";
import { getDayOfWeek } from "../api/adaptors";

function DailyForecast({ forecast }) {
  const day = getDayOfWeek(forecast[0].dt).slice(0, 12);
  const temp = Math.trunc(forecast[0].main.temp);
  const icon = getWeatherIcon(forecast[0].weather[0].icon);
  return (
    <div>
      <p> {day}</p>
      <img src={icon} alt="imagine" />
      <p>{temp}°C</p>
    </div>
  );
}

export default DailyForecast;
