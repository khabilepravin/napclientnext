import React from 'react';
import { Container, Row, Col } from 'reactstrap';


const Footer = () => {  
    return  <section className="py-5">
      <Container className="text-center">
        <Row>
          <Col lg={6} className="mx-auto">
            <h2 className="mb-3">
              Join thousands of students who are already mastering with our practice tests
            </h2>          
            <h5>*This is not an officially endorsed publication of the NAPLAN program and is produced independently of the Australian Curriculum, Assessment and Reporting Authority</h5>
          </Col>
        </Row>
      </Container>
    </section>
  };

  export default Footer;