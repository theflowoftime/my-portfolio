import axios from "axios";

const DATASET = process.env.VITE_SANITY_PROJECT_DATASET;
const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID;
const SANITY_WRITE_TOKEN = process.env.SANITY_PROJECT_TOKEN;

export const sendMessage = async (formData: FormData) =>
  await axios.post(
    `https://${PROJECT_ID}.api.sanity.io/v1/data/mutate/${DATASET}`,
    {
      mutations: [
        {
          create: {
            _type: "message",
            ...formData,
          },
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
      },
    }
  );
