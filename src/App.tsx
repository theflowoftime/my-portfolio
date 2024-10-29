import AboutMe from "./components/about-me";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/projects";

function App() {
  return (
    <div className="min-h-screen dark:bg-background dark:text-foreground">
      <Header />
      <Hero />
      <AboutMe />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
