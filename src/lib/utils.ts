import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
