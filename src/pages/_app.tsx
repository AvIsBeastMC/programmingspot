import "../styles/index.css";
import "aos/dist/aos.css";

import AOS from "aos";
import { AppProps } from "next/app";
import { GlobalStateProvider } from "../hooks/useGlobalState";
import Head from "next/head";
import Navbar from "../components/Navbar";
import firebase from "../../firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, [router.pathname]);

  return (
    <>
      <GlobalStateProvider>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </GlobalStateProvider>
    </>
  );
}

export default MyApp;
