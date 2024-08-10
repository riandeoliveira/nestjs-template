
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/api/user": {
        "delete": {
          "operationId": "",
          "summary": "",
          "description": "",
          "tags": [
            "User"
          ],
          "parameters": [],
          "responses": {
            "204": {
              "description": "No Content"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedDto"
                  }
                }
              }
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundDto"
                  }
                }
              }
            },
            "429": {
              "description": "Too Many Requests",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TooManyRequestsDto"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "jwt": []
            }
          ]
        },
        "put": {
          "operationId": "",
          "summary": "",
          "description": "",
          "tags": [
            "User"
          ],
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserRequest"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "No Content"
            },
            "400": {
              "description": "Bad Request",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestDto"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedDto"
                  }
                }
              }
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundDto"
                  }
                }
              }
            },
            "409": {
              "description": "Conflict",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ConflictDto"
                  }
                }
              }
            },
            "429": {
              "description": "Too Many Requests",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TooManyRequestsDto"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "jwt": []
            }
          ]
        }
      },
      "/api/user/forgot-password": {
        "post": {
          "operationId": "",
          "summary": "",
          "description": "",
          "tags": [
            "User"
          ],
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ForgotUserPasswordRequest"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "No Content"
            },
            "400": {
              "description": "Bad Request",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestDto"
                  }
                }
              }
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundDto"
                  }
                }
              }
            },
            "429": {
              "description": "Too Many Requests",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TooManyRequestsDto"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorDto"
                  }
                }
              }
            }
          }
        }
      },
      "/api/user/refresh-token/renew": {
        "post": {
          "operationId": "",
          "summary": "",
          "description": "",
          "tags": [
            "User"
          ],
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RenewUserRefreshTokenRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RenewUserRefreshTokenResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestDto"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedDto"
                  }
                }
              }
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundDto"
                  }
                }
              }
            },
            "429": {
              "description": "Too Many Requests",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TooManyRequestsDto"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "jwt": []
            }
          ]
        }
      },
      "/api/user/reset-password": {
        "post": {
          "operationId": "",
          "summary": "",
          "description": "",
          "tags": [
            "User"
          ],
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ResetUserPasswordRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResetUserPasswordResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestDto"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedDto"
                  }
                }
              }
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundDto"
                  }
                }
              }
            },
            "429": {
              "description": "Too Many Requests",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TooManyRequestsDto"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "jwt": []
            }
          ]
        }
      },
      "/api/user/sign-in": {
        "post": {
          "operationId": "sign-in-user",
          "summary": "",
          "description": "Authenticates a user and returns a token and user ID.",
          "tags": [
            "User"
          ],
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SignInUserRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SignInUserResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestDto"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedDto"
                  }
                }
              }
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundDto"
                  }
                }
              }
            },
            "429": {
              "description": "Too Many Requests",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TooManyRequestsDto"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorDto"
                  }
                }
              }
            }
          }
        }
      },
      "/api/user/sign-out": {
        "post": {
          "operationId": "",
          "summary": "",
          "description": "",
          "tags": [
            "User"
          ],
          "parameters": [],
          "responses": {
            "204": {
              "description": "No Content"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedDto"
                  }
                }
              }
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundDto"
                  }
                }
              }
            },
            "429": {
              "description": "Too Many Requests",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TooManyRequestsDto"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "jwt": []
            }
          ]
        }
      },
      "/api/user/sign-up": {
        "post": {
          "operationId": "sign-up-user",
          "summary": "",
          "description": "Authenticates a new user and returns a token and user ID.",
          "tags": [
            "User"
          ],
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SignUpUserRequest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SignUpUserResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestDto"
                  }
                }
              }
            },
            "409": {
              "description": "Conflict",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ConflictDto"
                  }
                }
              }
            },
            "429": {
              "description": "Too Many Requests",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TooManyRequestsDto"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorDto"
                  }
                }
              }
            }
          }
        }
      },
      "/api/user/verify": {
        "get": {
          "operationId": "",
          "summary": "",
          "description": "",
          "tags": [
            "User"
          ],
          "parameters": [],
          "responses": {
            "204": {
              "description": "No Content"
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UnauthorizedDto"
                  }
                }
              }
            },
            "404": {
              "description": "Not Found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundDto"
                  }
                }
              }
            },
            "429": {
              "description": "Too Many Requests",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TooManyRequestsDto"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/InternalServerErrorDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "jwt": []
            }
          ]
        }
      }
    },
    "info": {
      "title": "My Project API",
      "description": "Lorem Ipsum...",
      "version": "v0.1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "jwt": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "UnauthorizedDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "example": "https://httpstatuses.com/401"
            },
            "title": {
              "type": "string",
              "example": "Adicio cupiditate cunae spectaculum thymbra abscido."
            },
            "status": {
              "type": "number",
              "example": 401
            },
            "detail": {
              "type": "string",
              "example": "Unauthorized"
            }
          },
          "required": [
            "type",
            "title",
            "status",
            "detail"
          ]
        },
        "NotFoundDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "example": "https://httpstatuses.com/404"
            },
            "title": {
              "type": "string",
              "example": "Tenuis vere ea peior delectus complectus tero cedo velociter."
            },
            "status": {
              "type": "number",
              "example": 404
            },
            "detail": {
              "type": "string",
              "example": "Not Found"
            }
          },
          "required": [
            "type",
            "title",
            "status",
            "detail"
          ]
        },
        "TooManyRequestsDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "example": "https://httpstatuses.com/429"
            },
            "title": {
              "type": "string",
              "example": "Comminor depereo decumbo depereo cetera aro apparatus reprehenderit amet."
            },
            "status": {
              "type": "number",
              "example": 429
            },
            "detail": {
              "type": "string",
              "example": "Too Many Requests"
            }
          },
          "required": [
            "type",
            "title",
            "status",
            "detail"
          ]
        },
        "InternalServerErrorDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "example": "https://httpstatuses.com/500"
            },
            "title": {
              "type": "string",
              "example": "Armarium peior cunae."
            },
            "status": {
              "type": "number",
              "example": 500
            },
            "detail": {
              "type": "string",
              "example": "Internal Server Error"
            }
          },
          "required": [
            "type",
            "title",
            "status",
            "detail"
          ]
        },
        "ForgotUserPasswordRequest": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "Douglas68@gmail.com"
            }
          },
          "required": [
            "email"
          ]
        },
        "BadRequestDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "example": "https://httpstatuses.com/400"
            },
            "title": {
              "type": "string",
              "example": "Cenaculum amplus absens articulus non aliquam acer mollitia."
            },
            "status": {
              "type": "number",
              "example": 400
            },
            "detail": {
              "type": "string",
              "example": "Bad Request"
            }
          },
          "required": [
            "type",
            "title",
            "status",
            "detail"
          ]
        },
        "RenewUserRefreshTokenRequest": {
          "type": "object",
          "properties": {
            "refresh_token": {
              "type": "string",
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjI3NGU1Ni1lMzFmLTRkNjMtYmIxOS1hMjQ0MmM4Zjk2YmQifQ==.6"
            }
          },
          "required": [
            "refresh_token"
          ]
        },
        "ExpirableTokenDto": {
          "type": "object",
          "properties": {
            "value": {
              "type": "string",
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTFmODkwZS0zMjBlLTRjNjEtYjlhOS0yYzNjNmJiNTAzZTAifQ==.18"
            },
            "expires_in": {
              "type": "number",
              "example": 4798814
            }
          },
          "required": [
            "value",
            "expires_in"
          ]
        },
        "RenewUserRefreshTokenResponse": {
          "type": "object",
          "properties": {
            "user_id": {
              "type": "string",
              "example": "fd54b85d-07b1-4e38-92e4-7710f5c4f519"
            },
            "access_token": {
              "$ref": "#/components/schemas/ExpirableTokenDto"
            },
            "refresh_token": {
              "$ref": "#/components/schemas/ExpirableTokenDto"
            }
          },
          "required": [
            "user_id",
            "access_token",
            "refresh_token"
          ]
        },
        "ResetUserPasswordRequest": {
          "type": "object",
          "properties": {
            "password": {
              "type": "string",
              "example": "$049InYmV5zGOwt"
            },
            "password_confirmation": {
              "type": "string",
              "example": "$0L4BmL2osjLXDo"
            }
          },
          "required": [
            "password",
            "password_confirmation"
          ]
        },
        "ResetUserPasswordResponse": {
          "type": "object",
          "properties": {
            "user_id": {
              "type": "string",
              "example": "fd54b85d-07b1-4e38-92e4-7710f5c4f519"
            },
            "access_token": {
              "$ref": "#/components/schemas/ExpirableTokenDto"
            },
            "refresh_token": {
              "$ref": "#/components/schemas/ExpirableTokenDto"
            }
          },
          "required": [
            "user_id",
            "access_token",
            "refresh_token"
          ]
        },
        "SignInUserRequest": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "Joanny_Hansen@yahoo.com"
            },
            "password": {
              "type": "string",
              "example": "$0kIxxNqIuH9VZe"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "SignInUserResponse": {
          "type": "object",
          "properties": {
            "user_id": {
              "type": "string",
              "example": "fd54b85d-07b1-4e38-92e4-7710f5c4f519"
            },
            "access_token": {
              "$ref": "#/components/schemas/ExpirableTokenDto"
            },
            "refresh_token": {
              "$ref": "#/components/schemas/ExpirableTokenDto"
            }
          },
          "required": [
            "user_id",
            "access_token",
            "refresh_token"
          ]
        },
        "SignUpUserRequest": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "Eldora.Quigley17@yahoo.com"
            },
            "password": {
              "type": "string",
              "example": "$0elXE67tCMRvv0"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "SignUpUserResponse": {
          "type": "object",
          "properties": {
            "user_id": {
              "type": "string",
              "example": "fd54b85d-07b1-4e38-92e4-7710f5c4f519"
            },
            "access_token": {
              "$ref": "#/components/schemas/ExpirableTokenDto"
            },
            "refresh_token": {
              "$ref": "#/components/schemas/ExpirableTokenDto"
            }
          },
          "required": [
            "user_id",
            "access_token",
            "refresh_token"
          ]
        },
        "ConflictDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "example": "https://httpstatuses.com/409"
            },
            "title": {
              "type": "string",
              "example": "Appono alioqui tardus tertius ancilla accendo culpo ex."
            },
            "status": {
              "type": "number",
              "example": 409
            },
            "detail": {
              "type": "string",
              "example": "Conflict"
            }
          },
          "required": [
            "type",
            "title",
            "status",
            "detail"
          ]
        },
        "UpdateUserRequest": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "Anjali.Renner89@hotmail.com"
            },
            "password": {
              "type": "string",
              "example": "$0tDXs0M1CaPU17"
            }
          },
          "required": [
            "email",
            "password"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
