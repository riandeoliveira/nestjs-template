import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";
import { IsString as IsStringValidator } from "class-validator";

export const IsString = (messageKey: ResponseMessagesKey): PropertyDecorator => {
  return IsStringValidator({ message: ResponseMessages[messageKey] });
};
