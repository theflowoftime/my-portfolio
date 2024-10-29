import AboutMe from "./components/about-me";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Header from "./components/header";
import Projects from "./components/projects";
import useScrollHash from "./hooks/useScrollHash";

function App() {
  useScrollHash();

  return (
    <div id="top" className="min-h-screen container">
      <Header />
      <AboutMe />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
