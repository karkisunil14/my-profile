import About from '../components/About';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Spotlight from '../components/Spotlight';
import TechMarquee from '../components/TechMarquee';

export default function HomePage() {
  return (
    <div className="relative">
      <div className="site-atmosphere" aria-hidden="true" />
      <Spotlight />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Projects />
        <Experience />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
