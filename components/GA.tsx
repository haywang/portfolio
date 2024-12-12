'use client'
// import { useEffect } from "react";
import Script from 'next/script'
// import { useRouter } from "next/navigation";

const GA_TRACKING_ID = 'G-V15Z1YXRWN'

export default function GA() {
  // const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     window.gtag("config", GA_TRACKING_ID, {
  //       page_path: url,
  //     });
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
    </>
  )
}
