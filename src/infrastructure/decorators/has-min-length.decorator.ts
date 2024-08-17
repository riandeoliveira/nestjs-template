import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";
import { MinLength } from "class-validator";

export const HasMinLength = (min: number, messageKey: ResponseMessagesKey): PropertyDecorator => {
  return MinLength(min, { message: ResponseMessages[messageKey] });
};
