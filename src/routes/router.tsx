import App from "@/App";
import AboutMePage from "@/pages/about-me";
import Project from "@/pages/project";
import Projects from "@/pages/projects";
import { createBrowserRouter } from "react-router-dom";

// define the routers
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projects",
    element: <Projects />,

    children: [
      {
        path: ":projectId",
        element: <Project />,
      },
    ],
  },
  {
    path: "/about-me",
    element: <AboutMePage />,
  },
]);
