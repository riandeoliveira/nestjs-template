export enum ResponseMessages {
  EMAIL_ALREADY_EXISTS = "This 'email' is already being used.",
  EMAIL_HAS_MAXIMUM_LENGTH = "The 'email' must have a maximum of 64 characters.",
  EMAIL_HAS_MINIMUM_LENGTH = "The 'email' must have a minimum of 8 characters.",
  EMAIL_IS_REQUIRED = "The 'email' must be provided.",
  EMAIL_IS_STRING = "The 'email' must be a string.",
  EMAIL_IS_VALID = "The 'email' must be valid.",
  ENTITY_NOT_FOUND = "Entity not found.",

  INVALID_CREDENTIALS = "The 'email' or 'password' is invalid.",

  PASSWORD_CONFIRMATION_HAS_MAXIMUM_LENGTH = "The 'password confirmation' must have a maximum of 64 characters.",
  PASSWORD_CONFIRMATION_HAS_MINIMUM_LENGTH = "The 'password confirmation' must have a minimum of 8 characters.",
  PASSWORD_CONFIRMATION_IS_REQUIRED = "The 'password confirmation' must be provided.",
  PASSWORD_CONFIRMATION_IS_STRING = "The 'password confirmation' must be a string.",
  PASSWORD_HAS_MAXIMUM_LENGTH = "The 'password' must have a maximum of 64 characters.",
  PASSWORD_HAS_MINIMUM_LENGTH = "The 'password' must have a minimum of 8 characters.",
  PASSWORD_IS_REQUIRED = "The 'password' must be provided.",
  PASSWORD_IS_STRING = "The 'password' must be a string.",
  PASSWORD_IS_STRONG = "The 'password' must have at least: one lowercase letter, one uppercase letter, one number, and one symbol.",
  PASSWORDS_ARE_EQUIVALENT = "The 'passwords' must be equivalent.",
  PERSONAL_REFRESH_TOKEN_CREATE_ERROR = "An error occurred while creating the personal refresh token. Please try again later.",
  PERSONAL_REFRESH_TOKEN_DELETE_ERROR = "An error occurred while deleting the personal refresh token. Please try again later.",
  PERSONAL_REFRESH_TOKEN_NOT_FOUND = "Personal refresh token not found.",
  PERSONAL_REFRESH_TOKEN_UPDATE_ERROR = "An error occurred while updating the personal refresh token. Please try again later.",

  REFRESH_TOKEN_IS_REQUIRED = "The 'refresh token' must be provided.",
  REFRESH_TOKEN_IS_STRING = "The 'refresh token' must be a string.",
  REFRESH_TOKEN_LENGTH = "The 'refresh token' must have exactly 252 characters.",
  REQUEST_IS_EMPTY = "At least one field must be provided.",

  TOO_MANY_REQUESTS = "Too many requests. Please try again later.",

  UNAUTHORIZED_OPERATION = "You do not have permission to perform this action.",
  UNKNOWN_ERROR = "An unknown error has occurred. Please try again later.",

  USER_CREATE_ERROR = "An error occurred while creating the user. Please try again later.",
  USER_DELETE_ERROR = "An error occurred while deleting the user. Please try again later.",
  USER_NOT_FOUND = "User not found.",
  USER_UPDATE_ERROR = "An error occurred while updating the user. Please try again later.",
}

export type ResponseMessagesKey = keyof typeof ResponseMessages;
