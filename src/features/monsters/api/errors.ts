import { HttpError } from "@/lib/errors";

export const isNotFoundError = (error: unknown): error is HttpError =>
  error instanceof HttpError && error.status === 404;

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof HttpError) {
    if (error.status === 404) {
      return "Monster not found.";
    }

    return (
      (typeof error.body === "object" &&
        error.body !== null &&
        "error" in error.body &&
        typeof (error.body as { error?: string }).error === "string" &&
        (error.body as { error?: string }).error) ||
      `Request failed with status ${error.status}`
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error";
}
