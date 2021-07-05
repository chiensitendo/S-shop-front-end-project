import Head from 'next/head'
import Comming from "@/components/comming/comming";
import React from 'react';
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>S Shop App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="W8kc4WlU1OO_I76CmgndqrjA0JXtU4N3I_HrigWRaSE" />
      </Head>
      <main>
        <Comming></Comming>
      </main>
    </div>
  )
}
