import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends NextDocument {
  static async getInitialProps(ctx) {
    
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    
    return (
      <Html lang="en">
        <Head>
          {/* <link rel="icon" href="/favicon.ico" /> */}
          <link rel="icon" href="/assets/images/logo.svg" /> 
          <meta name="description" content="So-Cheap - Mua sắm thuận tiên, đảm bảo, tương tác trực tiếp, dễ dàng"></meta>
          <meta name="robots" />
          <meta name="googlebot" />
          <meta name="google-site-verification" content="W8kc4WlU1OO_I76CmgndqrjA0JXtU4N3I_HrigWRaSE" />
          <meta property="og:title" content="S Cheap | Mua sắm thuận tiên, đảm bảo, tương tác trực tiếp, dễ dàng"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:description" content="S Cheap. Mua sắm thuận tiên, đảm bảo, tương tác trực tiếp, dễ dàng"></meta>
          <script dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WM899BC');`,
            }}>
          </script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-N1C7Y4ZLLD">
          </script>
          <script dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              gtag('config', 'G-N1C7Y4ZLLD');`,
            }} >
          </script>
        </Head>
        <body>
              <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WM899BC"
              height="0" width="0" style={{display:"none", visibility:"hidden"}}></iframe></noscript>
              <div id = "wrapper-so-cheap-loading">
                  <div id = "so-cheap-loading"><div></div></div>
              </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
