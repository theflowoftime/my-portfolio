import AboutMe from "./components/about-me";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/projects";
import useScrollHash from "./hooks/useScrollHash";

function App() {
  useScrollHash();

  return (
    <div id="top">
      <div className="min-h-screen relative overflow-hidden z-10 bg-gradient bg-[length:200%_200%] animate-gradient bg-neutral-900 bg-clip-padding backdrop-filter bg-opacity-20">
        <Header />
        <Hero />
      </div>
      <main>
        <AboutMe />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
