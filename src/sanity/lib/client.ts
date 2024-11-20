import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../env";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const builder = imageUrlBuilder(client);

export default client;
