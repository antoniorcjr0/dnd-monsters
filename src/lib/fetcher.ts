import { HttpError } from "./errors";

type FetcherInit = Omit<RequestInit, "body"> & {
  baseUrl?: string;
  body?: BodyInit | null;
};

const isJsonResponse = (response: Response) => {
  const contentType = response.headers.get("content-type");
  return contentType?.toLowerCase().includes("application/json") ?? false;
};

export async function fetchJson<T>(path: string, init: FetcherInit = {}): Promise<T> {
  const { baseUrl, headers, ...rest } = init;
  const url = baseUrl ? new URL(path, baseUrl).toString() : path;

  const response = await fetch(url, {
    cache: rest.cache ?? "no-store",
    ...rest,
    headers: {
      Accept: "application/json",
      ...headers,
    },
  });

  const body = isJsonResponse(response) ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new HttpError({
      status: response.status,
      statusText: response.statusText,
      message: typeof body === "string" ? body : response.statusText,
      body: body ?? undefined,
    });
  }

  if (body === null) {
    throw new HttpError({
      status: response.status,
      statusText: response.statusText,
      message: "Expected JSON response",
    });
  }

  return body as T;
}
