import { useParams } from "react-router-dom";

function Project() {
  const { projectId } = useParams();

  return <div className="container">{projectId}</div>;
}

export default Project;
