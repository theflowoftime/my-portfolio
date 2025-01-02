import App from "@/App";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Projects = lazy(() => import("@/pages/projects"));
const Project = lazy(() => import("@/pages/project"));
const AllProjects = lazy(() => import("@/pages/all-projects"));
const ResumeViewer = lazy(() => import("@/pages/resume"));

// define the routers
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projects",
    element: (
      <Suspense>
        <Projects />
      </Suspense>
    ),

    children: [
      {
        path: ":projectName",
        element: <Project />,
      },
      {
        path: "all",
        element: <AllProjects />,
      },
    ],
  },
  {
    path: "/resume",
    element: (
      <Suspense>
        <ResumeViewer />
      </Suspense>
    ),
  },
]);
