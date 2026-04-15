"use client";
import { useEffect } from "react";
import { fbEvents } from "@/components/TrackingScripts";
import { LogoMarquee } from "@/components/LogoMarquee";
import { HowItWorks } from "@/components/HowItWorks";
import { VideoDemo } from "@/components/VideoDemo";
import { PainCards } from "@/components/PainCards";
import { Characters } from "@/components/Characters";
import { GiftComparison } from "@/components/GiftComparison";
import { Testimonials } from "@/components/Testimonials";
import { MeetTheTeam } from "@/components/MeetTheTeam";
import { UniqueMethod } from "@/components/UniqueMethod";
import { Pricing } from "@/components/Pricing";
import { Guarantee } from "@/components/Guarantee";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Objections } from "@/components/Objections";
import { Footer } from "@/components/Footer";
import { SocialProofToasts } from "@/components/SocialProofToasts";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { TimedOfferPopup } from "@/components/TimedOfferPopup";
import { OrderModalProvider } from "@/contexts/OrderModalContext";
import { QuizModalProvider } from "@/contexts/QuizModalContext";

export default function HomePage() {
  // Dispara ViewContent quando a pagina carrega
  useEffect(() => {
    fbEvents.viewContent({
      content_name: "Landing Page",
      content_category: "Videos Personalizados",
    });
  }, []);

  return (
    <OrderModalProvider>
      <QuizModalProvider>
        <main className="relative overflow-hidden">
          <VideoDemo />
          <LogoMarquee />
          <PainCards />
          <HowItWorks />
          <Characters />
          <GiftComparison />
          <Testimonials />
          <MeetTheTeam />
          <UniqueMethod />
          <Pricing />
          <Guarantee />
          <Objections />
          <FAQ />
          <FinalCTA />
          <Footer />
          <StickyMobileCTA />
          <TimedOfferPopup />
          <SocialProofToasts />
        </main>
      </QuizModalProvider>
    </OrderModalProvider>
  );
}
