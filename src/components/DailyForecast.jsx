import { getDate, getWeatherIcon } from "../api/adaptors";
import { getDayOfWeek } from "../api/adaptors";

function DailyForecast(props) {
  const { forecast } = props;
  // console.log(forecast);
  const day = getDayOfWeek(forecast[0].dt);
  const temp = Math.trunc(forecast[0].main.temp);
  const icon = getWeatherIcon(forecast[0].weather[0].icon);
  const description = forecast[0].weather[0].description;
  const dayMonth = getDate(forecast[0].dt);
  return (
    <div>
      <p>
        {day}, {dayMonth}
      </p>
      <div className="d-flex">
        <img src={icon} alt="iconImg" />
        <p>{temp}°C</p>
      </div>
      <p>{description}</p>
    </div>
  );
}

export default DailyForecast;
