import AboutMe from "./components/about-me";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/projects";
import Noise from "./components/sub-components/bg-noise-and-mask";
import useHashNavigation from "./hooks/useHashNavigation";
import Cursor from "./components/sub-components/custom-cursor";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function App() {
  useHashNavigation();

  const { data } = useQuery({
    queryFn: () => {
      axios.get("/info");
    },
    queryKey: ["info"],
  });

  console.log(data);

  return (
    <div className="relative cursor-none">
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
