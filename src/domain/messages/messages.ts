// TODO: update messages

export const MESSAGES = {
  EMAIL: {
    ALREADY_EXISTS: "This 'email' is already being used.",
    HAS_MAXIMUM_LENGTH: "The 'email' must have a maximum of 64 characters.",
    HAS_MINIMUM_LENGTH: "The 'email' must have a minimum of 8 characters.",
    IS_NOT_REGISTERED: "This 'email' is not registered.",
    IS_REQUIRED: "The 'email' must be provided.",
    IS_STRING: "The 'email' must be a string.",
    IS_VALID: "The 'email' must be valid.",
  },

  PASSWORD: {
    HAS_MAXIMUM_LENGTH: "The 'password' must have a maximum of 64 characters.",
    HAS_MINIMUM_LENGTH: "The 'password' must have a minimum of 8 characters.",
    IS_EQUIVALENT: "The 'passwords' must be equivalent.",
    IS_REQUIRED: "The 'password' must be provided.",
    IS_STRING: "The 'password' must be a string.",
    IS_STRONG:
      "The 'password' must have at least: one lowercase letter, one uppercase letter, one number, and one symbol.",
    RESET_REQUEST: "Password reset request",
  },

  ACCESS_TOKEN_IS_REQUIRED: "The 'access token' must be provided.",
  AUTHOR_NOT_FOUND: "No 'author' found.",
  AVATAR_URL_IS_REQUIRED: "The 'avatar url' must be provided.",

  DESCRIPTION_IS_REQUIRED: "The 'description' must be provided.",

  ENTITY_NOT_FOUND: "No entity found.",

  FULL_NAME_IS_REQUIRED: "The 'full name' must be provided.",

  INVALID_LOGIN_CREDENTIALS: "The 'email' or 'password' is invalid.",

  MAXIMUM_AVATAR_URL_LENGTH: "The 'avatar url' must have a maximum of 512 characters.",
  MAXIMUM_DESCRIPTION_LENGTH: "The 'description' must have a maximum of 1024 characters.",
  MAXIMUM_FULL_NAME_LENGTH: "The 'full name' must have a maximum of 128 characters.",
  MAXIMUM_NAME_LENGTH: "The 'name' must have a maximum of 64 characters.",
  MAXIMUM_PAGE_NUMBER_LENGTH: "The 'page number' must be less than or equal to 100.",
  MAXIMUM_PAGE_SIZE_LENGTH: "The 'page size' must be less than or equal to 100.",
  MAXIMUM_POSITION_LENGTH: "The 'position' must have a maximum of 64 characters.",
  MAXIMUM_SPOTIFY_ACCOUNT_NAME_LENGTH:
    "The 'Spotify account name' must have a maximum of 64 characters.",

  NAME_IS_REQUIRED: "The 'name' must be provided.",

  POSITION_IS_REQUIRED: "The 'position' must be provided.",

  UNAUTHORIZED_OPERATION: "You do not have permission to perform this action.",
  USER_NOT_FOUND: "No 'user' found.",

  REQUEST_IS_EMPTY: "At least one field must be provided."
};
