import { isValid } from "date-fns";

export function formatStartTime(
  date: Date | undefined,
  time: string | undefined
) {
  if (!date || !time) return null;
  // Combine date and time into a full ISO 8601 string
  const startDateTime = new Date(`${date}T${time}:00`);

  if (!isValid(startDateTime)) {
    throw new Error(
      "Invalid date or time format. Please use yyyy-MM-dd for date and HH:mm for time."
    );
  }

  return startDateTime.toISOString(); // Ensures it is in UTC
}
