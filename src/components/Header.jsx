import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function ChooseLocation() {
  const [isDisplayed, setIsDisplayed] = useState(false);

  function handleMenuClick() {
    setIsDisplayed((prevIsDisplayed) => !prevIsDisplayed);
  }

  let dropdownMenuClasses = styles.dropdownMenu;
  if (isDisplayed) {
    dropdownMenuClasses += ` ${styles.displayMobileMenu}`;
  }

  return (
    <section className={styles.leftSide}>
      <h2>Vremea oraşului tău</h2>
      <nav className={styles.nav}>
        <Container>
          <div className={styles.menuIconContainer}>
            <span
              onClick={handleMenuClick}
              className={`material-icons ${styles.menuIcon} text-light`}
            >
              {" "}
              menu{" "}
            </span>
            <ul className={dropdownMenuClasses}>
              <li className={isDisplayed ? "container" : null}>
                <Link to="/" className={`${styles.li} p-3 text-uppercase`}>
                  Vremea curentă
                </Link>
              </li>
              <li className={isDisplayed ? "container" : null}>
                <Link
                  to="/favorite"
                  className={`${styles.li} p-3 text-uppercase`}
                >
                  Oraşe favorite
                </Link>
              </li>
              <li className={isDisplayed ? "container" : null}>
                <Link
                  to="/forecast"
                  className={`${styles.li} p-3 text-uppercase`}
                >
                  Prognoza meteo
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
    </section>
  );
}

export default ChooseLocation;
