import Dashboard from "../components/layout/Dashboard";
import { Container, Col, Card, Row, CardBody, CardHeader, CardTitle } from "reactstrap";

const Support = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h5" className="mb-0">
                Support
              </CardTitle>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

Support.layout = Dashboard;

export default Support;
