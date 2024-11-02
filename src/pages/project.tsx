import { useParams } from "react-router-dom";

function Project() {
  const { projectId } = useParams();

  return <div className="">{projectId}</div>;
}

export default Project;
