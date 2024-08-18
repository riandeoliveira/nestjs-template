import { MaxLength } from "class-validator";
import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";

export const HasMaxLength = (max: number, messageKey: ResponseMessagesKey): PropertyDecorator => {
  return MaxLength(max, { message: ResponseMessages[messageKey] });
};
