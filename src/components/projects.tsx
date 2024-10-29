import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/lib/types";
import { queryClient } from "@/main";
import { useLanguageStore } from "@/stores/language-store";
import { Link, useLocation } from "react-router-dom";

function Projects() {
  const language = useLanguageStore((state) => state.language);
  const { projects, isLoading, error } = useProjects(language);

  const location = useLocation();
  const navLinks =
    location.state?.navLinks ||
    queryClient.getQueryData(["navLinks", language]);

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p>Error fetching projects: {error.message}</p>;

  if (!navLinks) return <p>Loading navigation...</p>;

  // Find the slug for the "works" section, as the 3rd link
  const worksSlug = navLinks?.links?.[2].slug || "works";

  return (
    <div id={worksSlug}>
      <h1>Projects List</h1>
      <Link to={"/projects"}>View all</Link>
      {projects.length > 0 ? (
        projects.map((project: Project) => (
          <div key={project._id}>
            <h2>{project.title}</h2>
            <p>Description: {project.description}</p>
            <p>url: {project.link}</p>
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}

export default Projects;
