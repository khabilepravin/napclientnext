import '../styles/modern.css'
import React from "react";

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (children => <>{children}</>);
  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp
