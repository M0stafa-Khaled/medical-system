import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { SystemOverview } from "../components/SystemOverview";
import { DoctorsPreview } from "../components/DoctorsPreview";
import { SpecializedClinics } from "../components/SpecializedClinics";
import { HowItWorks } from "../components/HowItWorks";
import { Features } from "../components/Features";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { CTA } from "../components/CTA";

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
