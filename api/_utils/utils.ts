import { parseISO, format } from "date-fns";

/**
 * Formats a date and time into the required Zoom start_time format.
 *
 * @param {string} date - The date string in YYYY-MM-DD format.
 * @param {string} time - The time string in HH:mm format.
 * @returns {string} - The combined date-time string in yyyy-MM-ddTHH:mm:ss format.
 */
export function formatStartTime(date: string, time: string): string {
  try {
    // Combine date and time into a single ISO string
    const combinedDateTime = parseISO(`${date}T${time}:00`);

    // Format the date-time in Zoom's required format
    const start_time = format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ss");

    return start_time;
  } catch (error) {
    throw new Error("Invalid date or time format");
  }
}
