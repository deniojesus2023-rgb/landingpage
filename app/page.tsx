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

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <VideoDemo />
      <LogoMarquee />
      <PainCards />
      <HowItWorks />
      <Characters />
      <GiftComparison />
      <Testimonials />
      <MeetTheTeam />
      <Pricing />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
      <SocialProofToasts />
    </main>
  );
}
