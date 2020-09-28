import React from "react";
import { Container, Row, Col } from "reactstrap";
//import { Link } from "react-router-dom";
import Link from "next/link";

const Footer = () => {
  
  return  <footer className="footer">
    <Container fluid>
      <Row className="text-muted">
        <Col xs={8} className="text-left">
          <ul className="list-inline">
            <li className="list-inline-item">
              <Link href="/support">
                <a className="text-muted mr-1">
                Support
                </a>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="dashboard">
              <a className="text-muted mr-1">
                Privacy
                </a>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="/about">
              <a className="text-muted mr-1">
                About
                </a>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="dashboard">
              <a className="text-muted mr-1">
                Contact
                </a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col xs={4} className="text-right">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} -{" "}
            <Link href="dashboard">
            <a  className="text-muted">
              PracTest
              </a>
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
};

export default Footer;
