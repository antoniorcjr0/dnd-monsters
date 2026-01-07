export class HttpError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly body?: unknown;

  constructor(params: {
    status: number;
    statusText: string;
    message?: string;
    body?: unknown;
  }) {
    const { status, statusText, message, body } = params;

    super(message ?? `Request failed with status ${status}`);
    this.name = "HttpError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}
