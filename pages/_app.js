import '../styles/modern.css'
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
//TODO: Find a permanent solution for TLS verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const client = new ApolloClient({
  uri: process.env.graphApiPath,
});

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  //console.log(`here is the layout ${Component.layout}`)
  const Layout = Component.layout || (children => <>{children}</>);
  return  (<ApolloProvider client={client}><Component {...pageProps}></Component></ApolloProvider>)  
}

export default MyApp
