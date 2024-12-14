import { _Type } from "api/types";
import axios from "axios";

const DATASET = process.env.VITE_SANITY_PROJECT_DATASET;
const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID;
const SANITY_WRITE_TOKEN = process.env.SANITY_PROJECT_TOKEN;

export const sendMessage = async (formData: FormData, _type: _Type) => {
  try {
    return await axios.post(
      `https://${PROJECT_ID}.api.sanity.io/v1/data/mutate/${DATASET}`,
      {
        mutations: [
          {
            create: {
              _type,
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
  } catch (error) {
    console.error("Error sending message to Sanity:", error);
    throw new Error("Failed to send message");
  }
};
