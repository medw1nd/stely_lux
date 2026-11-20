import Header from './site/Header';
import Hero from './site/Hero';
import { Manifesto, Marquee, Materials, Process, Region, Solutions } from './site/Sections';
import Portfolio from './site/Portfolio';
import Faq from './site/Faq';
import { BackToTop, Contact, Footer, MobileCta } from './site/Contact';
import { CursorLight } from './site/fx';

function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <CursorLight />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Solutions />
        <Portfolio />
        <Materials />
        <Process />
        <Faq />
        <Region />
        <Contact estimate="" />
      </main>
      <Footer />
      <MobileCta />
      <BackToTop />
    </>
  );
}

export default App;
