import Head from 'next/head'
import Comming from "@/components/comming/comming";
import React from 'react';
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>S Shop App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Comming></Comming>
      </main>
    </div>
  )
}
