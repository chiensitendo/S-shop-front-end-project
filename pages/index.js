import Head from 'next/head';
import Comming from "@/components/comming/comming";
import React from 'react';
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>So Cheap App</title>
        <meta property="og:url" content="https://so-cheap.vercel.app/"></meta>
        <meta property="og:site_name" content="So Cheap"></meta>
      </Head>
      <main>
        <Comming></Comming>
      </main>
    </div>
  )
}
