import { queryClient } from "@/main";
import { useLanguageStore } from "@/stores/language-store";
import { Projects } from "@/types/types";
import { useParams } from "react-router-dom";

function Project() {
  const { projectId } = useParams();
  const language = useLanguageStore((state) => state.language);

  const projects = queryClient.getQueryData<Projects>(["projects", language]);

  const project = projects?.find((project) => project._id === projectId);
  console.log(project);

  return <div className="">{projectId}</div>;
}

export default Project;
