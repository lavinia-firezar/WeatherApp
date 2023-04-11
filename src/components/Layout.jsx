import { Container, Navbar } from "react-bootstrap";
import styles from "./Layout.module.css";
import { Link } from "react-router-dom";

function Layout(props) {
  return (
    <div className={styles.layout}>
      <header className={styles.background1}>
        <nav>
          <Container>
            <Navbar className={styles.Navbar}>
              <Link to="/" className={styles.li}>
                Vremea curentă
              </Link>
              <Link to="/favorite" className={styles.li}>
                Orașe favorite
              </Link>
              <Link to="/forecast" className={styles.li}>
                Prognoza meteo
              </Link>
            </Navbar>
          </Container>
        </nav>
      </header>
      <main>{props.children}</main>
      <footer className={styles.background2}></footer>
    </div>
  );
}

export default Layout;
