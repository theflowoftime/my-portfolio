import AboutMe from "./components/about-me";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/projects";
import useHashNavigation from "./hooks/useHashNavigation";

function App() {
  useHashNavigation();
  return (
    <div className="relative overflow-hidden">
      <div
        id="top"
        className="min-h-screen h-full z-10 bg-gradient bg-[length:200%_200%] animate-gradient bg-neutral-900 bg-clip-padding backdrop-filter bg-opacity-20"
      >
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
