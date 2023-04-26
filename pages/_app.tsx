import React, { useEffect } from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { controller, store } from "../src/state/StateController";
import Script from "next/script";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import SEO from "@bradgarropy/next-seo";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import DownloaderDialog from "../components/helpers/DownloaderDialog/DownloaderDialog";
import DownloadIcon from "../components/helpers/DownloadIcon";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  //   const states = useSelector(() => controller.states);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      controller.setState({ downloadLoader: true });
    });
  }, [router.events]);

  return (
    <Provider store={store}>
      <React.Fragment>
        <NextNProgress
          color="#C5DCFA"
          startPosition={0.3}
          stopDelayMs={200}
          height={9}
          showOnShallow={true}
        />
        <Script
          data-ad-client="ca-pub-5709045243455533"
          async
          strategy="afterInteractive"
          onError={(e) => {
            console.error("Script failed to load", e);
          }}
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
        <SEO
          title="All Downloader"
          description="All Site content download"
          keywords={[
            "video",
            "image",
            "reels",
            "picture",
            "story",
            "facebook",
            "tiktok",
            "youtube",
            "instagram",
            "downloader",
            "all downloader",
            "tiktok downloader",
            "facebook downloader",
            "instagram downloader",
            "youtube downloader",
          ]}
          icon="/icon-192x192.png"
          facebook={{
            image: "/images/ubuntu.svg",
            url: "https://all-downloader-2023.vercel.app",
            type: "website",
          }}
        />
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </React.Fragment>
    </Provider>
  );
}
