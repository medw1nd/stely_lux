import Header from './site/Header';
import Hero from './site/Hero';
import { Manifesto, Marquee, Materials, Process, Region, Solutions } from './site/Sections';
import Portfolio from './site/Portfolio';
import Faq from './site/Faq';
import { Contact, Footer, MobileCta } from './site/Contact';

function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
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
    </>
  );
}

export default App;
