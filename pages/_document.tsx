//@ts-nocheck
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
              {/* <title>Downloader App</title> */}
              {/* <Script
            id="Adsense-id"
            data-ad-client="ca-pub-5709045243455533"
            async="true"
            strategy="beforeInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          /> */}
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                    <script type="text/javascript" dangerouslySetInnerHTML={{
                        __html: `
              (function(c,l,a,r,i,t,y){
                            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "g0u9gctzd1");
                    `
                    }} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
