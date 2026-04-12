"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { UrgencyBar } from "@/components/UrgencyBar";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { HowItWorks } from "@/components/HowItWorks";
import { VideoDemo } from "@/components/VideoDemo";
import { Characters } from "@/components/Characters";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
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
      <UrgencyBar />
      <Navbar />
      <Hero />
      <LogoMarquee />
      <VideoDemo />
      <HowItWorks />
      <Characters />
      <Testimonials />
      <Pricing onSelect={handleSelect} />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
      <OrderModal
        open={modalOpen}
        plan={plan}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
