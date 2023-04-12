import { Col, Container, Row } from "react-bootstrap";
import DailyForecast from "./DailyForecast";

function DailyForecastList(props) {
  const { forecastDetails } = props;
  return (
    <Container className="mt-3">
      <Row>
        {forecastDetails.map((forecast) => {
          return (
            <Col
              className={`d-flex flex-column justify-content-between align-items-center`}
              key={forecast}
            >
              <section>
                <DailyForecast forecast={forecast} />
              </section>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default DailyForecastList;
