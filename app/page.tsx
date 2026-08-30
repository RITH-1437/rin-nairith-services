import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Cta from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Technologies />
      <Projects />
      <Process />
      <Pricing />
      <About />
      <Faq />
      <Contact />
      <Cta />
    </>
  );
}
