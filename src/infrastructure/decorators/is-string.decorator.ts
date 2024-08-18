import { IsString as IsStringValidator } from "class-validator";
import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";

export const IsString = (messageKey: ResponseMessagesKey): PropertyDecorator => {
  return IsStringValidator({ message: ResponseMessages[messageKey] });
};
