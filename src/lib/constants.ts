import type { FormSchemaType } from "@/types/types";
import { Variants } from "framer-motion";

export const THROTTLE_DELAY = 5000;
export const defaultValues: FormSchemaType = {
  name: "",
  email: "",
  phoneNumber: "",
  reason: "", // form.reset isn't resetting it.
};

export const textVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6 },
  }),
};
