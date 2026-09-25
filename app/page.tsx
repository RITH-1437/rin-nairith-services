import Hero from "@/components/Hero";
import CapabilityStrip from "@/components/CapabilityStrip";
import Services from "@/components/Services";
import Technologies from "@/components/Technologies";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Collaborators from "@/components/Collaborators";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Cta from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <Services />
      <Technologies />
      <WhyUs />
      <Process />
      <Projects />
      <Pricing />
      <About />
      <Collaborators />
      <Faq />
      <Contact />
      <Cta />
    </>
  );
}
