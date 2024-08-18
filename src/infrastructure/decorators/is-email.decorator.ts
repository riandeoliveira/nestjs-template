import { IsEmail as IsEmailValidator } from "class-validator";
import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";

export const IsEmail = (messageKey: ResponseMessagesKey): PropertyDecorator => {
  return IsEmailValidator({}, { message: ResponseMessages[messageKey] });
};
