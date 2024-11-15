import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import { useProjects } from "@/hooks/useProjects";
import SectionLayout from "@/layouts/section-layout";
import type { Project } from "@/types/types";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

function Projects() {
  const { language, navLinks } = useCachedNavLinks();
  const { projects, isLoading, error } = useProjects(language);
  // Find the slug for the "works" section, as the 3rd link
  const slug = navLinks?.links?.[2].slug || "works";

  if (isLoading)
    return (
      <SectionLayout slug={slug}>
        <Loader2 />
      </SectionLayout>
    );
  if (error) return <p>Error fetching projects: {error.message}</p>;

  if (!navLinks) return <p>Loading navigation...</p>;

  return (
    <SectionLayout slug={slug}>
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
    </SectionLayout>
  );
}

export default Projects;
