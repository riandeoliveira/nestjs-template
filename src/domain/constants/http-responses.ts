export const HttpSuccessResponses = {
  ACCEPTED: {
    status: 202,
    message: "Accepted",
    isError: false,
  },
  CREATED: {
    status: 201,
    message: "Created",
    isError: false,
  },
  FOUND: {
    status: 302,
    message: "Found",
    isError: false,
  },
  MOVED_PERMANENTLY: {
    status: 301,
    message: "Moved Permanently",
    isError: false,
  },
  MULTIPLE_CHOICES: {
    status: 300,
    message: "Multiple Choices",
    isError: false,
  },
  NO_CONTENT: {
    status: 204,
    message: "No Content",
    isError: false,
  },
  NON_AUTHORITATIVE_INFORMATION: {
    status: 203,
    message: "Non-Authoritative Information",
    isError: false,
  },
  NOT_MODIFIED: {
    status: 304,
    message: "Not Modified",
    isError: false,
  },
  OK: {
    status: 200,
    message: "OK",
    isError: false,
  },
  PARTIAL_CONTENT: {
    status: 206,
    message: "Partial Content",
    isError: false,
  },
  PERMANENT_REDIRECT: {
    status: 308,
    message: "Permanent Redirect",
    isError: false,
  },
  RESET_CONTENT: {
    status: 205,
    message: "Reset Content",
    isError: false,
  },
  SEE_OTHER: {
    status: 303,
    message: "See Other",
    isError: false,
  },
  TEMPORARY_REDIRECT: {
    status: 307,
    message: "Temporary Redirect",
    isError: false,
  },
  USE_PROXY: {
    status: 305,
    message: "Use Proxy",
    isError: false,
  },
} as const;

export const HttpErrorResponses = {
  AMBIGUOUS: {
    status: 300,
    message: "Ambiguous",
    isError: true,
  },
  BAD_GATEWAY: {
    status: 502,
    message: "Bad Gateway",
    isError: true,
  },
  BAD_REQUEST: {
    status: 400,
    message: "Bad Request",
    isError: true,
  },
  CONFLICT: {
    status: 409,
    message: "Conflict",
    isError: true,
  },
  EXPECTATION_FAILED: {
    status: 417,
    message: "Expectation Failed",
    isError: true,
  },
  FAILED_DEPENDENCY: {
    status: 424,
    message: "Failed Dependency",
    isError: true,
  },
  FORBIDDEN: {
    status: 403,
    message: "Forbidden",
    isError: true,
  },
  GATEWAY_TIMEOUT: {
    status: 504,
    message: "Gateway Timeout",
    isError: true,
  },
  GONE: {
    status: 410,
    message: "Gone",
    isError: true,
  },
  HTTP_VERSION_NOT_SUPPORTED: {
    status: 505,
    message: "HTTP Version Not Supported",
    isError: true,
  },
  I_AM_A_TEAPOT: {
    status: 418,
    message: "I'm a teapot",
    isError: true,
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal Server Error",
    isError: true,
  },
  LENGTH_REQUIRED: {
    status: 411,
    message: "Length Required",
    isError: true,
  },
  LOCKED: {
    status: 423,
    message: "Locked",
    isError: true,
  },
  METHOD_NOT_ALLOWED: {
    status: 405,
    message: "Method Not Allowed",
    isError: true,
  },
  MISDIRECTED: {
    status: 421,
    message: "Misdirected Request",
    isError: true,
  },
  NOT_ACCEPTABLE: {
    status: 406,
    message: "Not Acceptable",
    isError: true,
  },
  NOT_FOUND: {
    status: 404,
    message: "Not Found",
    isError: true,
  },
  NOT_IMPLEMENTED: {
    status: 501,
    message: "Not Implemented",
    isError: true,
  },
  PAYLOAD_TOO_LARGE: {
    status: 413,
    message: "Payload Too Large",
    isError: true,
  },
  PAYMENT_REQUIRED: {
    status: 402,
    message: "Payment Required",
    isError: true,
  },
  PRECONDITION_FAILED: {
    status: 412,
    message: "Precondition Failed",
    isError: true,
  },
  PROXY_AUTHENTICATION_REQUIRED: {
    status: 407,
    message: "Proxy Authentication Required",
    isError: true,
  },
  REQUEST_HEADER_FIELDS_TOO_LARGE: {
    status: 431,
    message: "Request Header Fields Too Large",
    isError: true,
  },
  REQUEST_TIMEOUT: {
    status: 408,
    message: "Request Timeout",
    isError: true,
  },
  REQUESTED_RANGE_NOT_SATISFIABLE: {
    status: 416,
    message: "Requested Range Not Satisfiable",
    isError: true,
  },
  SERVICE_UNAVAILABLE: {
    status: 503,
    message: "Service Unavailable",
    isError: true,
  },
  TOO_MANY_REQUESTS: {
    status: 429,
    message: "Too Many Requests",
    isError: true,
  },
  UNAUTHORIZED: {
    status: 401,
    message: "Unauthorized",
    isError: true,
  },
  UNPROCESSABLE_ENTITY: {
    status: 422,
    message: "Unprocessable Entity",
    isError: true,
  },
  UNSUPPORTED_MEDIA_TYPE: {
    status: 415,
    message: "Unsupported Media Type",
    isError: true,
  },
  URI_TOO_LONG: {
    status: 414,
    message: "URI Too Long",
    isError: true,
  },
} as const;

export const HttpResponses = {
  ...HttpSuccessResponses,
  ...HttpErrorResponses,
};

export type HttpSuccessResponsesKey = keyof typeof HttpSuccessResponses;
export type HttpErrorResponsesKey = keyof typeof HttpErrorResponses;

export type HttpResponsesKey = HttpSuccessResponsesKey | HttpErrorResponsesKey;
