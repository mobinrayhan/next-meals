import Layout from "@/components/layout/main-layout";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next Meals - MOBIN</title>{" "}
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
