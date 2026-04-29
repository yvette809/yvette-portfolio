import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <Hero />
      <Divider />
      <Reveal>
        <About />
      </Reveal>
      <Divider />
      <Projects />
      <Divider />
      <Skills />
      <Divider />
      <Experience />
      <Divider />
      <Education />
      <Divider />
      <BlogPreview />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}

function Divider() {
  return <div className="h-px bg-white/[0.07] mx-[5vw] relative z-[2]" />;
}
