// since we're using 'useEffect' import named exports as React (required)
import * as React from 'react';
// import Head for client-side viewport SEO (optional and can be removed)
import Head from 'next/head';

// if not using hooks, swap out 'useEffect' for 'componentDidMount'
// and destructure { Component, pageProps } from 'this.props'

// if you're not using 'getInitialProps' on the client-side then
// you don't need to extend Next's 'App' from 'next/app'
// instead just utilize a function that returns Component with pageProps (like below)

// eslint-disable-next-line react/prop-types
const App = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // MUI has 2 sheets: 1 for server-side and 1 for client-side
    // we don't want this duplication, so during initial client-side load,
    // attempt to locate duplicated server-side MUI stylesheets...
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode)
      // ...and if they exist remove them from the head
      jssStyles.parentNode.removeChild(jssStyles);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
};

export default App;
