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
import { useEffect } from "react";

function App() {
  useHashNavigation();

  const { data: ipData, refetch: fetchIP } = useQuery({
    queryFn: async () => {
      const response = await axios.get("/api/info");
      return response.data.ip; // Assuming the IP is in `response.data.ip`
    },
    queryKey: ["ip"],
    enabled: false, // Start disabled
    staleTime: Infinity,
  });

  const { data: locationInfo } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`http://ip-api.com/json/${ipData}`);
      return response.data; // Assuming the location info is in `response.data`
    },
    queryKey: ["info"],
    enabled: !!ipData, // Only fetch if IP is available
  });

  // Trigger the first query on initial load
  useEffect(() => {
    fetchIP();
  }, [fetchIP]);

  console.log(locationInfo);

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
