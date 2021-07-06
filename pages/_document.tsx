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
          <link rel="icon" href="/favicon.ico" />
          <meta name="google-site-verification" content="W8kc4WlU1OO_I76CmgndqrjA0JXtU4N3I_HrigWRaSE" />
          <script>
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-WM899BC');`}
          </script>
        </Head>
        <body>
              <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WM899BC"
              height="0" width="0" style={{display:"none", visibility:"hidden"}}></iframe></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
