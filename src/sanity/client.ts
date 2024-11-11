import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId, token } from "./env";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  ignoreBrowserTokenWarning: true,
});

export default client;
