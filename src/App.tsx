import AboutMe from "./components/about-me";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/projects";
import Noise from "./components/sub-components/bg-noise-and-mask";
import useHashNavigation from "./hooks/useHashNavigation";
import Cursor from "./components/sub-components/custom-cursor";
import { cn } from "./lib/utils";
import { useLanguageStore } from "./stores/language-store";

function App() {
  useHashNavigation();
  const language = useLanguageStore((state) => state.language);

  return (
    // <div className="relative overflow-x-hidden cursor-none">
    <div
      className={cn(
        "relative cursor-none",
        language === "AR" && "tracking-widest font-baloo"
      )}
    >
      <Cursor />
      <Noise />
      <div id="top">
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
