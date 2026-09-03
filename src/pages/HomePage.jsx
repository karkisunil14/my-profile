import { Suspense, lazy } from 'react';
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

const Journey = lazy(() => import('../three/Journey'));

export default function HomePage() {
  return (
    <div className="relative">
      <Suspense fallback={null}>
        <Journey />
      </Suspense>
      <Spotlight />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
