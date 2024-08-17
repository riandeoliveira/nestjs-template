export declare const HttpSuccessResponses: {
    readonly ACCEPTED: {
        readonly status: 202;
        readonly message: "Accepted";
        readonly isError: false;
    };
    readonly CREATED: {
        readonly status: 201;
        readonly message: "Created";
        readonly isError: false;
    };
    readonly FOUND: {
        readonly status: 302;
        readonly message: "Found";
        readonly isError: false;
    };
    readonly MOVED_PERMANENTLY: {
        readonly status: 301;
        readonly message: "Moved Permanently";
        readonly isError: false;
    };
    readonly MULTIPLE_CHOICES: {
        readonly status: 300;
        readonly message: "Multiple Choices";
        readonly isError: false;
    };
    readonly NO_CONTENT: {
        readonly status: 204;
        readonly message: "No Content";
        readonly isError: false;
    };
    readonly NON_AUTHORITATIVE_INFORMATION: {
        readonly status: 203;
        readonly message: "Non-Authoritative Information";
        readonly isError: false;
    };
    readonly NOT_MODIFIED: {
        readonly status: 304;
        readonly message: "Not Modified";
        readonly isError: false;
    };
    readonly OK: {
        readonly status: 200;
        readonly message: "OK";
        readonly isError: false;
    };
    readonly PARTIAL_CONTENT: {
        readonly status: 206;
        readonly message: "Partial Content";
        readonly isError: false;
    };
    readonly PERMANENT_REDIRECT: {
        readonly status: 308;
        readonly message: "Permanent Redirect";
        readonly isError: false;
    };
    readonly RESET_CONTENT: {
        readonly status: 205;
        readonly message: "Reset Content";
        readonly isError: false;
    };
    readonly SEE_OTHER: {
        readonly status: 303;
        readonly message: "See Other";
        readonly isError: false;
    };
    readonly TEMPORARY_REDIRECT: {
        readonly status: 307;
        readonly message: "Temporary Redirect";
        readonly isError: false;
    };
    readonly USE_PROXY: {
        readonly status: 305;
        readonly message: "Use Proxy";
        readonly isError: false;
    };
};
export declare const HttpErrorResponses: {
    readonly AMBIGUOUS: {
        readonly status: 300;
        readonly message: "Ambiguous";
        readonly isError: true;
    };
    readonly BAD_GATEWAY: {
        readonly status: 502;
        readonly message: "Bad Gateway";
        readonly isError: true;
    };
    readonly BAD_REQUEST: {
        readonly status: 400;
        readonly message: "Bad Request";
        readonly isError: true;
    };
    readonly CONFLICT: {
        readonly status: 409;
        readonly message: "Conflict";
        readonly isError: true;
    };
    readonly EXPECTATION_FAILED: {
        readonly status: 417;
        readonly message: "Expectation Failed";
        readonly isError: true;
    };
    readonly FAILED_DEPENDENCY: {
        readonly status: 424;
        readonly message: "Failed Dependency";
        readonly isError: true;
    };
    readonly FORBIDDEN: {
        readonly status: 403;
        readonly message: "Forbidden";
        readonly isError: true;
    };
    readonly GATEWAY_TIMEOUT: {
        readonly status: 504;
        readonly message: "Gateway Timeout";
        readonly isError: true;
    };
    readonly GONE: {
        readonly status: 410;
        readonly message: "Gone";
        readonly isError: true;
    };
    readonly HTTP_VERSION_NOT_SUPPORTED: {
        readonly status: 505;
        readonly message: "HTTP Version Not Supported";
        readonly isError: true;
    };
    readonly I_AM_A_TEAPOT: {
        readonly status: 418;
        readonly message: "I'm a teapot";
        readonly isError: true;
    };
    readonly INTERNAL_SERVER_ERROR: {
        readonly status: 500;
        readonly message: "Internal Server Error";
        readonly isError: true;
    };
    readonly LENGTH_REQUIRED: {
        readonly status: 411;
        readonly message: "Length Required";
        readonly isError: true;
    };
    readonly LOCKED: {
        readonly status: 423;
        readonly message: "Locked";
        readonly isError: true;
    };
    readonly METHOD_NOT_ALLOWED: {
        readonly status: 405;
        readonly message: "Method Not Allowed";
        readonly isError: true;
    };
    readonly MISDIRECTED: {
        readonly status: 421;
        readonly message: "Misdirected Request";
        readonly isError: true;
    };
    readonly NOT_ACCEPTABLE: {
        readonly status: 406;
        readonly message: "Not Acceptable";
        readonly isError: true;
    };
    readonly NOT_FOUND: {
        readonly status: 404;
        readonly message: "Not Found";
        readonly isError: true;
    };
    readonly NOT_IMPLEMENTED: {
        readonly status: 501;
        readonly message: "Not Implemented";
        readonly isError: true;
    };
    readonly PAYLOAD_TOO_LARGE: {
        readonly status: 413;
        readonly message: "Payload Too Large";
        readonly isError: true;
    };
    readonly PAYMENT_REQUIRED: {
        readonly status: 402;
        readonly message: "Payment Required";
        readonly isError: true;
    };
    readonly PRECONDITION_FAILED: {
        readonly status: 412;
        readonly message: "Precondition Failed";
        readonly isError: true;
    };
    readonly PROXY_AUTHENTICATION_REQUIRED: {
        readonly status: 407;
        readonly message: "Proxy Authentication Required";
        readonly isError: true;
    };
    readonly REQUEST_HEADER_FIELDS_TOO_LARGE: {
        readonly status: 431;
        readonly message: "Request Header Fields Too Large";
        readonly isError: true;
    };
    readonly REQUEST_TIMEOUT: {
        readonly status: 408;
        readonly message: "Request Timeout";
        readonly isError: true;
    };
    readonly REQUESTED_RANGE_NOT_SATISFIABLE: {
        readonly status: 416;
        readonly message: "Requested Range Not Satisfiable";
        readonly isError: true;
    };
    readonly SERVICE_UNAVAILABLE: {
        readonly status: 503;
        readonly message: "Service Unavailable";
        readonly isError: true;
    };
    readonly TOO_MANY_REQUESTS: {
        readonly status: 429;
        readonly message: "Too Many Requests";
        readonly isError: true;
    };
    readonly UNAUTHORIZED: {
        readonly status: 401;
        readonly message: "Unauthorized";
        readonly isError: true;
    };
    readonly UNPROCESSABLE_ENTITY: {
        readonly status: 422;
        readonly message: "Unprocessable Entity";
        readonly isError: true;
    };
    readonly UNSUPPORTED_MEDIA_TYPE: {
        readonly status: 415;
        readonly message: "Unsupported Media Type";
        readonly isError: true;
    };
    readonly URI_TOO_LONG: {
        readonly status: 414;
        readonly message: "URI Too Long";
        readonly isError: true;
    };
};
export declare const HttpResponses: {
    AMBIGUOUS: {
        readonly status: 300;
        readonly message: "Ambiguous";
        readonly isError: true;
    };
    BAD_GATEWAY: {
        readonly status: 502;
        readonly message: "Bad Gateway";
        readonly isError: true;
    };
    BAD_REQUEST: {
        readonly status: 400;
        readonly message: "Bad Request";
        readonly isError: true;
    };
    CONFLICT: {
        readonly status: 409;
        readonly message: "Conflict";
        readonly isError: true;
    };
    EXPECTATION_FAILED: {
        readonly status: 417;
        readonly message: "Expectation Failed";
        readonly isError: true;
    };
    FAILED_DEPENDENCY: {
        readonly status: 424;
        readonly message: "Failed Dependency";
        readonly isError: true;
    };
    FORBIDDEN: {
        readonly status: 403;
        readonly message: "Forbidden";
        readonly isError: true;
    };
    GATEWAY_TIMEOUT: {
        readonly status: 504;
        readonly message: "Gateway Timeout";
        readonly isError: true;
    };
    GONE: {
        readonly status: 410;
        readonly message: "Gone";
        readonly isError: true;
    };
    HTTP_VERSION_NOT_SUPPORTED: {
        readonly status: 505;
        readonly message: "HTTP Version Not Supported";
        readonly isError: true;
    };
    I_AM_A_TEAPOT: {
        readonly status: 418;
        readonly message: "I'm a teapot";
        readonly isError: true;
    };
    INTERNAL_SERVER_ERROR: {
        readonly status: 500;
        readonly message: "Internal Server Error";
        readonly isError: true;
    };
    LENGTH_REQUIRED: {
        readonly status: 411;
        readonly message: "Length Required";
        readonly isError: true;
    };
    LOCKED: {
        readonly status: 423;
        readonly message: "Locked";
        readonly isError: true;
    };
    METHOD_NOT_ALLOWED: {
        readonly status: 405;
        readonly message: "Method Not Allowed";
        readonly isError: true;
    };
    MISDIRECTED: {
        readonly status: 421;
        readonly message: "Misdirected Request";
        readonly isError: true;
    };
    NOT_ACCEPTABLE: {
        readonly status: 406;
        readonly message: "Not Acceptable";
        readonly isError: true;
    };
    NOT_FOUND: {
        readonly status: 404;
        readonly message: "Not Found";
        readonly isError: true;
    };
    NOT_IMPLEMENTED: {
        readonly status: 501;
        readonly message: "Not Implemented";
        readonly isError: true;
    };
    PAYLOAD_TOO_LARGE: {
        readonly status: 413;
        readonly message: "Payload Too Large";
        readonly isError: true;
    };
    PAYMENT_REQUIRED: {
        readonly status: 402;
        readonly message: "Payment Required";
        readonly isError: true;
    };
    PRECONDITION_FAILED: {
        readonly status: 412;
        readonly message: "Precondition Failed";
        readonly isError: true;
    };
    PROXY_AUTHENTICATION_REQUIRED: {
        readonly status: 407;
        readonly message: "Proxy Authentication Required";
        readonly isError: true;
    };
    REQUEST_HEADER_FIELDS_TOO_LARGE: {
        readonly status: 431;
        readonly message: "Request Header Fields Too Large";
        readonly isError: true;
    };
    REQUEST_TIMEOUT: {
        readonly status: 408;
        readonly message: "Request Timeout";
        readonly isError: true;
    };
    REQUESTED_RANGE_NOT_SATISFIABLE: {
        readonly status: 416;
        readonly message: "Requested Range Not Satisfiable";
        readonly isError: true;
    };
    SERVICE_UNAVAILABLE: {
        readonly status: 503;
        readonly message: "Service Unavailable";
        readonly isError: true;
    };
    TOO_MANY_REQUESTS: {
        readonly status: 429;
        readonly message: "Too Many Requests";
        readonly isError: true;
    };
    UNAUTHORIZED: {
        readonly status: 401;
        readonly message: "Unauthorized";
        readonly isError: true;
    };
    UNPROCESSABLE_ENTITY: {
        readonly status: 422;
        readonly message: "Unprocessable Entity";
        readonly isError: true;
    };
    UNSUPPORTED_MEDIA_TYPE: {
        readonly status: 415;
        readonly message: "Unsupported Media Type";
        readonly isError: true;
    };
    URI_TOO_LONG: {
        readonly status: 414;
        readonly message: "URI Too Long";
        readonly isError: true;
    };
    ACCEPTED: {
        readonly status: 202;
        readonly message: "Accepted";
        readonly isError: false;
    };
    CREATED: {
        readonly status: 201;
        readonly message: "Created";
        readonly isError: false;
    };
    FOUND: {
        readonly status: 302;
        readonly message: "Found";
        readonly isError: false;
    };
    MOVED_PERMANENTLY: {
        readonly status: 301;
        readonly message: "Moved Permanently";
        readonly isError: false;
    };
    MULTIPLE_CHOICES: {
        readonly status: 300;
        readonly message: "Multiple Choices";
        readonly isError: false;
    };
    NO_CONTENT: {
        readonly status: 204;
        readonly message: "No Content";
        readonly isError: false;
    };
    NON_AUTHORITATIVE_INFORMATION: {
        readonly status: 203;
        readonly message: "Non-Authoritative Information";
        readonly isError: false;
    };
    NOT_MODIFIED: {
        readonly status: 304;
        readonly message: "Not Modified";
        readonly isError: false;
    };
    OK: {
        readonly status: 200;
        readonly message: "OK";
        readonly isError: false;
    };
    PARTIAL_CONTENT: {
        readonly status: 206;
        readonly message: "Partial Content";
        readonly isError: false;
    };
    PERMANENT_REDIRECT: {
        readonly status: 308;
        readonly message: "Permanent Redirect";
        readonly isError: false;
    };
    RESET_CONTENT: {
        readonly status: 205;
        readonly message: "Reset Content";
        readonly isError: false;
    };
    SEE_OTHER: {
        readonly status: 303;
        readonly message: "See Other";
        readonly isError: false;
    };
    TEMPORARY_REDIRECT: {
        readonly status: 307;
        readonly message: "Temporary Redirect";
        readonly isError: false;
    };
    USE_PROXY: {
        readonly status: 305;
        readonly message: "Use Proxy";
        readonly isError: false;
    };
};
export type HttpSuccessResponsesKey = keyof typeof HttpSuccessResponses;
export type HttpErrorResponsesKey = keyof typeof HttpErrorResponses;
export type HttpResponsesKey = HttpSuccessResponsesKey | HttpErrorResponsesKey;
