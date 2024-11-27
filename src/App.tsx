import AboutMe from "./components/about-me";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/projects";
import useHashNavigation from "./hooks/useHashNavigation";

const Rays = () => {
  return (
    <div
      className="f-1fpxu4o"
      style={{
        opacity: 1,
        willChange: "transform",
        transform: "none",
      }}
    >
      <div
        className="f-1yp8dcl f-rZlwZ"
        style={{ transform: "skewX(45deg)" }}
      ></div>
      <div
        className="f-1tkmzk9 f-rZlwZ"
        style={{ transform: "skewX(45deg)" }}
      ></div>
      <div
        className="f-if0sjr f-rZlwZ"
        style={{ transform: "skewX(45deg)" }}
      ></div>
      <div
        className="f-1xgonwz f-rZlwZ"
        style={{ transform: "skewX(45deg)" }}
      ></div>
      <div
        className="f-1lv1w0o f-rZlwZ"
        style={{ transform: "skewX(45deg)" }}
      ></div>
    </div>
  );
};

function App() {
  useHashNavigation();
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0 min-h-screen opacity-10">
        <div className="absolute inset-0 bg-repeat bg-[length:150px_auto] bg-left-top bg-[url('/noise.png')]" />
      </div>

      <div id="top" className="relative h-full">
        <Rays />
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
