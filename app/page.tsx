import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import GridField from "@/components/GridField";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Leadership from "@/components/Leadership";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-bone">
      <GridField />
      <Header />
      <main id="top" className="relative z-1">
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Leadership />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
