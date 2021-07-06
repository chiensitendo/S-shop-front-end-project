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
          <script src = "assets/vendors/google-verification.js" type = "text/javascript">
          </script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-159445034-1">
          </script>
          <script src = "assets/vendors/gtag.js" type = "text/javascript">
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
