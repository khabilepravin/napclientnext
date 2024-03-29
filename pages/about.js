import Dashboard from "../components/layout/Dashboard";
import { Container, Col, Card, Row, CardBody, CardHeader, CardTitle } from "reactstrap";

const About = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h5" className="mb-0">
                About
              </CardTitle>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

About.layout = Dashboard;

export default About;
