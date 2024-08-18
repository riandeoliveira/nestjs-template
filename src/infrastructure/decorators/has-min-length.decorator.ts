import { MinLength } from "class-validator";
import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";

export const HasMinLength = (min: number, messageKey: ResponseMessagesKey): PropertyDecorator => {
  return MinLength(min, { message: ResponseMessages[messageKey] });
};
