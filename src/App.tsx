import { Header } from './components/Header';
import { StatusStrip } from './components/StatusStrip';
import { Hero } from './components/Hero';
import { WhatIBuild } from './components/WhatIBuild';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Stack } from './components/Stack';
import { Work } from './components/Work';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <Header />
      <StatusStrip />
      <main>
        <Hero />
        <WhatIBuild />
        <Work />
        <Experience />
        <Stack />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
