import '../styles/modern.css'
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
//TODO: Find a permanent solution for TLS verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const client = new ApolloClient({
  uri: process.env.graphApiPath,
});

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (children => <>{children}</>);
  return <Layout><ApolloProvider client={client}><Component {...pageProps} /></ApolloProvider></Layout>
}

export default MyApp
