import ChooseLocation from "../components/Header";
import CurrentWeather from "../components/CurrentWeather";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <ChooseLocation></ChooseLocation>

      <CurrentWeather></CurrentWeather>
    </div>
  );
}

export default Home;
