import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Layout from "../components/Layout";
import { useContext } from "react";
import { FavoriteContext } from "../store/AddToFavorite/context";
import styles from "./Favorite.module.css";
import { removeFromFavorite } from "../store/AddToFavorite/actions";

function Favorite(props) {
  const { favState, favDispatch } = useContext(FavoriteContext);
  const { id } = props;

  function handleRemoveFavorite(cityId) {
    const actionResult = removeFromFavorite(cityId);
    favDispatch(actionResult);
  }

  return (
    <div>
      <Layout>
        <div className={styles.content}>
          <section className={styles.background}>
            <Container>
              <Row>
                {favState.citiesFav.length === 0 ? (
                  <section className={styles.background2}>
                    <h2>Nu ai niciun oraş favorit</h2>
                  </section>
                ) : (
                  favState.citiesFav.map((element) => {
                    return (
                      <Col xs={12} md={6} lg={3} className="mb-4">
                        <section
                          key={element.id}
                          className={`mt-4 d-flex flex-column justify-content-between align-items-center`}
                        >
                          <Card.Img
                            src={element.icon}
                            className={styles.card}
                          />
                          <Card.Body className={styles.card}>
                            <Card.Title>{element.name}</Card.Title>
                            <Card.Title>{element.dt}</Card.Title>
                            <Card.Title>{element.description}</Card.Title>
                            <Card.Title>{element.temp} °C</Card.Title>
                          </Card.Body>
                        </section>
                      </Col>
                    );
                  })
                )}
              </Row>
              {favState.citiesFav.length === 0 ? (
                <section></section>
              ) : (
                <Button
                  variant="light"
                  onClick={() => handleRemoveFavorite(id)}
                  className={styles.btn}
                >
                  Sterge oraşele tale favorite
                </Button>
              )}
            </Container>
          </section>
        </div>
      </Layout>
    </div>
  );
}

export default Favorite;
