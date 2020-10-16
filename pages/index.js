import React,{ useEffect } from "react";
import Link from 'next/link';
import  LoginButton  from "../components/app/LoginButton";
import LogoutButton from "../components/app/LogoutButton";
import HomeLayout from "../components/layout/HomeLayout";
import AppLogo from "../components/theme/AppLogo";
import { useRouter } from "next/router";
import fetch from 'isomorphic-unfetch';
import auth0 from "../utils/auth0";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";

import {
  Button,
  Col,
  Container,
  Row,
  Navbar,
  NavbarBrand
} from "reactstrap";
import TestTypes from "../components/app/TestTypes";
import axiosClient from "../lib/apiproxy/axiosClient";
import { GET_USER_BY_SOCIAL_ID } from "../lib/apiproxy/queries";
import { ADD_USER } from "../lib/apiproxy/mutations";



const Header = (props) => (
  <Navbar dark expand="xs" className="absolute-top w-100 py-2">
    <Container>
      <NavbarBrand className="font-weight-bold" href="/">
      <AppLogo/>Prac Test
      </NavbarBrand>   
      <LoginButton loggedInUser={props.user}/>
      <LogoutButton loggedInUser={props.user}/>
    </Container>  
  </Navbar>
);

const Intro = () => (
  <section className="pt-7 pb-5 landing-bg text-white overflow-hidden">
    <Container className="py-4">
      <Row>
        <Col xl={11} className="mx-auto">
          <Row>
            <Col md={12} xl={8} className="mx-auto text-center">
              <div className="d-block my-4">
                <h1 className="display-4 font-weight-bold mb-3 text-white">
                  Ever increasing comprehensive set of tests for year 3, 6 students
                </h1>
                <p className="lead font-weight-light mb-3 landing-text">
                                    A professional package that comes with hunderds of tests with score tracking and automatic shuffling of questions and answers.
                                    Makes re-taking test less repetitive and more challanging
                                    </p>
                
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

const Navigation = () => (
  <div className="py-3 bg-white landing-nav">
    <Container className="text-center">
      <Link href="/dashboard">
      <Button       
        to="/dashboard"
        color="primary"
        size="lg"
        target="_blank"
        className="btn-pill"
      >
        Preview
      </Button>
      </Link>
      <Link href="/documentation">
      <Button
        
        to="/documentation"
        color="link"
        size="lg"
        target="_blank"
        className="btn-pill text-dark"
      >
        Documentation
      </Button>
      </Link>
      <Link href="/documentation">
      <Button        
        to="/documentation"
        color="link"
        size="lg"
        target="_blank"
        className="btn-pill text-dark"
      >
        Changelog
      </Button>
      </Link>
      <Link href="/mailto:support@bootlab.io">
      <Button
        href="mailto:support@bootlab.io"
        color="link"
        size="lg"
        target="_blank"
        className="btn-pill text-dark"
      >
        Support
      </Button>
      </Link>
    </Container>
  </div>
);

const Styles = () => {
  //const { user, isAuthenticated } = useAuth0();
 return (<section className="py-6">
    <Container>
      <div className="mb-4 text-center">
        <h2>Quick links to try the samples</h2>
        <p className="text-muted">
          Multiple numeracy tests to try from.
        </p>
      
      <span>No User</span>
      {/* <img src={user ? user.picture : ''} alt={user ? user.name : ''}/> */}
      </div>

      
    </Container>
  </section>)
};



const Footer = () => {  
  return  <section className="py-5">
    <Container className="text-center">
      <Row>
        <Col lg={6} className="mx-auto">
          <h2 className="mb-3">
            Join thousands of students who are already mastering with our practice tests
          </h2>          
        </Col>
      </Row>
    </Container>
  </section>
};

const Landing = (props) => {   
  const [addUser] = useMutation(ADD_USER, {
    onCompleted({ addUser }) {
      console.log(`user added`);
    },
  });

    useEffect(() => {
      if(props?.user){
        console.log(JSON.stringify(props?.user));
        axiosClient.PostQuery(GET_USER_BY_SOCIAL_ID, { socialId: props?.user.sub }).then((result) => {
          const userDbRecord = result.data.data;
          
          if(userDbRecord.userBySocialId == null){
             console.log(`user not linked`);
             // add user record
             addUser({
              variables: {
                user: {
                  firstName: props.user.given_name,
                  lastName: props.user.family_name,
                  email: props.user.nickname,
                  userName: props.user.nickname,
                  socialLoginId: props.user.sub,
                  socialProfilePicUrl: props.user.picture
                },
              },
            });
          }
          else {
             console.log(`user linked`);
          }
        });        
      }
      else{
        console.log(`No user data was provided`);
      }
    }, []);

    return (
      <React.Fragment>
        <Header user={Object.keys(props).length > 0 ? props.user : null} />
        <Intro />
        <Navigation />        
        <TestTypes/>
        <Footer />
      </React.Fragment>
    );  
};
Landing.layout = HomeLayout;

export async function getServerSideProps(context) {
    const session = await auth0.getSession(context.req);    
    return { props: session ? session : {} }; 
}

export default Landing;
