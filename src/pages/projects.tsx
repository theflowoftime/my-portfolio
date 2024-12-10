import Cursor from "@/components/sub-components/custom-cursor";
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

  if (isLoading) return <PageLayout />;
  if (error) return <div>error...</div>;

  return (
    <div className="relative h-full cursor-none">
      <div className="opacity-5 absolute inset-0 bg-repeat -z-10 bg-[url('/noise.png')]" />
      <Cursor />
      <PageLayout>
        <Outlet context={projects} />
      </PageLayout>
    </div>
  );
}

export default Projects;
