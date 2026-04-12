"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { HowItWorks } from "@/components/HowItWorks";
import { VideoDemo } from "@/components/VideoDemo";
import { PainCards } from "@/components/PainCards";
import { Characters } from "@/components/Characters";
import { GiftComparison } from "@/components/GiftComparison";
import { Testimonials } from "@/components/Testimonials";
import { MeetTheTeam } from "@/components/MeetTheTeam";
import { Pricing } from "@/components/Pricing";
import { Guarantee } from "@/components/Guarantee";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { SocialProofToasts } from "@/components/SocialProofToasts";
import { OrderModal } from "@/components/OrderModal";

type Plan = "essencial" | "duplo";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [plan, setPlan] = useState<Plan>("essencial");

  const handleSelect = (p: Plan) => {
    setPlan(p);
    setModalOpen(true);
  };

  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <VideoDemo />
      <PainCards />
      <HowItWorks />
      <Characters />
      <GiftComparison />
      <Testimonials />
      <MeetTheTeam />
      <Pricing onSelect={handleSelect} />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
      {!modalOpen && <SocialProofToasts />}
      <OrderModal
        open={modalOpen}
        plan={plan}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
