import { isAxiosError } from "axios";

export function getErrorMessage(err: unknown): string {
  if (isAxiosError(err)) return err.message;
  if (err instanceof Error) return err.message;
  return "An unknown error occurred";
}
