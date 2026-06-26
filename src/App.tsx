import { Header } from './components/Header';
import { StatusStrip } from './components/StatusStrip';
import { Hero } from './components/Hero';
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
        <About />
        <Experience />
        <Stack />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
