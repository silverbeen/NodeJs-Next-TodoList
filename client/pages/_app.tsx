import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../src/components/common/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
