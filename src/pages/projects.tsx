import { useProjects } from "@/hooks/useProjects";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import PageLayout from "@/layouts/page-layout";
import { useLanguageStore } from "@/stores/language-store";
import { Outlet } from "react-router-dom";

function Projects() {
  useScrollToTop();
  // pass in the slug instead of the title | transaltions
  const language = useLanguageStore((state) => state.language);
  const { projects, isLoading, error } = useProjects(language);

  if (isLoading) return <PageLayout title="projects" />;
  if (error) return <div>error...</div>;

  return (
    <PageLayout title="projects">
      <Outlet context={projects} />
    </PageLayout>
  );
}

export default Projects;
