import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../env";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export default client;