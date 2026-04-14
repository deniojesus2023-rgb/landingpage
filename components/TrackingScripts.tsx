"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// Declaracao global do fbq
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

// Funcao helper para disparar eventos do Facebook Pixel
export function trackFBEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
}

// Eventos especificos para facilitar o uso
export const fbEvents = {
  pageView: () => trackFBEvent("PageView"),
  viewContent: (params?: { content_name?: string; content_category?: string; value?: number; currency?: string }) => 
    trackFBEvent("ViewContent", params),
  initiateCheckout: (params?: { value?: number; currency?: string; content_name?: string }) => 
    trackFBEvent("InitiateCheckout", params),
  addToCart: (params?: { value?: number; currency?: string; content_name?: string }) => 
    trackFBEvent("AddToCart", params),
  purchase: (params: { value: number; currency: string; content_name?: string }) => 
    trackFBEvent("Purchase", params),
  lead: (params?: { content_name?: string }) => 
    trackFBEvent("Lead", params),
};

function FacebookPixelEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Dispara PageView em cada mudanca de rota
    if (FB_PIXEL_ID && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

function FacebookPixelScript() {
  if (!FB_PIXEL_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

function UTMifyScript() {
  return (
    <Script
      id="utmify"
      src="https://cdn.utmify.com.br/scripts/utms/latest.js"
      data-utmify-prevent-xcod-sck
      data-utmify-prevent-subids
      strategy="afterInteractive"
    />
  );
}

export default function TrackingScripts() {
  return (
    <>
      <FacebookPixelScript />
      <Suspense fallback={null}>
        <FacebookPixelEvents />
      </Suspense>
      <UTMifyScript />
    </>
  );
}
