import { useParams } from "react-router-dom";

function Project() {
  const { projectId } = useParams();

  return projectId;
}

export default Project;
