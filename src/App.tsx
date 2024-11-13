import AboutMe from "./components/about-me";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Header from "./components/header";
import Projects from "./components/projects";
import useScrollHash from "./hooks/useScrollHash";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  useScrollHash();

  return (
    <div id="top">
      <Header />
      <AboutMe />
      <Projects />
      <Contact />
      <Footer />
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
