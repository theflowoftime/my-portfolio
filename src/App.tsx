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
    <div className="">
      <div
        id="top"
        className="h-full bg-gradient bg-[length:200%_200%] animate-gradient"
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
