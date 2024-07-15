export type ResponseMessagesKey = keyof typeof ResponseMessages;

export enum ResponseMessages {
  EMAIL_ALREADY_EXISTS = "This 'email' is already being used.",
  EMAIL_HAS_MAXIMUM_LENGTH = "The 'email' must have a maximum of 64 characters.",
  EMAIL_HAS_MINIMUM_LENGTH = "The 'email' must have a minimum of 8 characters.",
  EMAIL_IS_REQUIRED = "The 'email' must be provided.",
  EMAIL_IS_STRING = "The 'email' must be a string.",
  EMAIL_IS_VALID = "The 'email' must be valid.",
  ENTITY_NOT_FOUND = "Entity not found.",

  INVALID_CREDENTIALS = "The 'email' or 'password' is invalid.",

  PASSWORD_HAS_MAXIMUM_LENGTH = "The 'password' must have a maximum of 64 characters.",
  PASSWORD_HAS_MINIMUM_LENGTH = "The 'password' must have a minimum of 8 characters.",
  PASSWORD_IS_EQUIVALENT = "The 'passwords' must be equivalent.",
  PASSWORD_IS_REQUIRED = "The 'password' must be provided.",
  PASSWORD_IS_STRING = "The 'password' must be a string.",
  PASSWORD_IS_STRONG = "The 'password' must have at least: one lowercase letter, one uppercase letter, one number, and one symbol.",
  PASSWORD_RESET_REQUEST = "Password reset request",

  REQUEST_IS_EMPTY = "At least one field must be provided.",

  UNAUTHORIZED_OPERATION = "You do not have permission to perform this action.",
  USER_NOT_FOUND = "User not found.",
}
