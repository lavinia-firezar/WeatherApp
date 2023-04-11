import { Col, Container, Row } from "react-bootstrap";
import DailyForecast from "./DailyForecast";

function DailyForecastList({ forecastDetails }) {
  return (
    <Container className="mt-3">
      <Row>
        {forecastDetails.map((forecast) => (
          <Col
            className={`mt-4 d-flex flex-column justify-content-between align-items-center`}
            key={forecast}
          >
            <DailyForecast forecast={forecast} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DailyForecastList;
