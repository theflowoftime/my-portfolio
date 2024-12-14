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
import useVisitorStore from "./stores/visitor-store";
import { useEffect } from "react";

function App() {
  useHashNavigation();
  const setVisitorInfo = useVisitorStore((state) => state.setVisitorInfo);

  // Fetch visitor data and store it in Zustand
  const { data: visitorInfo } = useQuery({
    queryKey: ["visitorInfo"],
    queryFn: async () => {
      // Fetch the IP
      const ipResponse = await axios.get("/api/info");
      const ip = ipResponse.data.ip;

      // Fetch visitor profile
      const infoResponse = await axios.get(`http://ip-api.com/json/${ip}`);
      return infoResponse.data; // Return the visitor info
    },
    staleTime: Infinity, // Cache data indefinitely to avoid re-fetching
    gcTime: Infinity, // Keep data in the cache forever
  });

  // Update Zustand state when visitorInfo changes
  useEffect(() => {
    if (visitorInfo) {
      setVisitorInfo(visitorInfo);
    }
  }, [visitorInfo, setVisitorInfo]);

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
