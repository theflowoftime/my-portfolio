import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export function CN(...inputs) {
  return twMerge(clsx(inputs));
}
