import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import client from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomOffset = (maxOffset: number) => {
  return {
    x: Math.floor(Math.random() * maxOffset * 2) - maxOffset,
    y: Math.floor(Math.random() * maxOffset * 2) - maxOffset,
  };
};

export const getRandomColor = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFA533"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomRotation = () => Math.floor(Math.random() * 360); // Random rotation for each item

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
