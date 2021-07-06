import Head from 'next/head';
import Comming from "@/components/comming/comming";
import React from 'react';
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>S Shop App</title>
        {/* <title>S Shop App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="W8kc4WlU1OO_I76CmgndqrjA0JXtU4N3I_HrigWRaSE" />
        <script>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WM899BC');`}
        </script> */}
      </Head>
      <main>
        <Comming></Comming>
      </main>
    </div>
  )
}
