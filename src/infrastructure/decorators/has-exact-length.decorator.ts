import { Length } from "class-validator";
import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";

export const HasExactLength = (
  length: number,
  messageKey: ResponseMessagesKey,
): PropertyDecorator => {
  return Length(length, length, { message: ResponseMessages[messageKey] });
};
