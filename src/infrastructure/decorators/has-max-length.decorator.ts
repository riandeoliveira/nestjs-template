import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";
import { MaxLength } from "class-validator";

export const HasMaxLength = (max: number, messageKey: ResponseMessagesKey): PropertyDecorator => {
  return MaxLength(max, { message: ResponseMessages[messageKey] });
};
