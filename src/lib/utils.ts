import client from "@/sanity/lib/client";
import { useLanguageStore } from "@/stores/language-store";
import imageUrlBuilder from "@sanity/image-url";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LOCALES } from "./constants";

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

// Helper function to clean and validate locales using Intl.getCanonicalLocales
function getCanonicalLocale(locale: string): string | undefined {
  const [canonicalLocale] = Intl.getCanonicalLocales(locale);
  return canonicalLocale;
}

const findLocale = (): string => {
  const language = useLanguageStore((state) => state.language);

  // Find matching browser language from user's preferences
  const matchedBrowserLocale = navigator.languages.find((ln) => {
    const canonicalBrowserLocale = getCanonicalLocale(ln);
    return canonicalBrowserLocale?.startsWith(language.toLowerCase());
  });

  // Return matched locale, fallback to mapped locale, or default to "en-US"
  return (
    matchedBrowserLocale || getCanonicalLocale(LOCALES[language]) || "en-US"
  );
};

export function formatDate(dateToFormat: Date): string {
  const locale = findLocale();

  return new Intl.DateTimeFormat(locale).format(new Date(dateToFormat));
}

// disabled dates saturday and sunday cannot be picked as default meeting date
export function computeDefaultMeetingDate() {
  const today = new Date();
  let defaultMeetingDate = today;

  function increaseDate(by: 1 | 2) {
    return defaultMeetingDate.setUTCDate(today.getUTCDate() + by);
  }

  if (today.getDay() === 0) increaseDate(1);
  else if (today.getDay() === 6) increaseDate(2);

  return defaultMeetingDate;
}

export function formatDateForSanity(date: Date) {
  try {
    return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  } catch (error) {
    throw new Error("Invalid Date");
  }
}

/**
 * Get client side timezone.
 *
 * @returns {(+|-)HH:mm} - Where `HH` is 2 digits hours and `mm` 2 digits minutes.
 * @example
 * // From Indian/Reunion with UTC+4
 * // '+04:00'
 * getTimeZone()
 */
export const getTimeZoneOffset = (apiOffset: number | undefined) => {
  let offsetInHours: number | null = null;

  // Use `apiOffset` if provided
  if (apiOffset !== undefined) {
    offsetInHours = apiOffset / 3600; // Convert seconds to hours
  }

  // Calculate local timezone offset if `apiOffset` is not provided
  const timezoneOffset = new Date().getTimezoneOffset(); // Local timezone offset in minutes
  const localOffsetInHours = timezoneOffset / -60; // Convert minutes to hours, invert sign for UTC

  // Use `apiOffset` if available, otherwise use local offset
  const finalOffset =
    offsetInHours !== null ? offsetInHours : localOffsetInHours;

  // Build the UTC offset string
  const offsetOperator = finalOffset >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(finalOffset);
  const offsetHours = Math.floor(absoluteOffset).toString().padStart(2, "0");
  const offsetMinutes = Math.floor((absoluteOffset % 1) * 60)
    .toString()
    .padStart(2, "0");

  return `UTC ${offsetOperator}${offsetHours}:${offsetMinutes}`;
};

export const isIntendedDomain =
  typeof window !== "undefined" &&
  window.location.hostname ===
    (import.meta.env.PROD
      ? import.meta.env.VITE_WEBSITE_URL
      : import.meta.env.VITE_DEV_WEBSITE_URL);
