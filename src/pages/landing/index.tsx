import { Navbar } from "@/features/landing";
import { Hero } from "@/features/landing";
import { SystemOverview } from "@/features/landing";
import { DoctorsPreview } from "@/features/landing";
import { SpecializedClinics } from "@/features/landing";
import { HowItWorks } from "@/features/landing";
import { Features } from "@/features/landing";
import { Testimonials } from "@/features/landing";
import { FAQ } from "@/features/landing";
import { CTA } from "@/features/landing";

const Landing = () => {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col font-sans">
      <Navbar />
      <Hero />
      <SystemOverview />
      <DoctorsPreview />
      <SpecializedClinics />
      <HowItWorks />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
};

export default Landing;
