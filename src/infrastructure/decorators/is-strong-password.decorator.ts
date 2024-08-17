import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";
import { IsStrongPassword as IsStrongPasswordValidator } from "class-validator";

export const IsStrongPassword = (messageKey: ResponseMessagesKey): PropertyDecorator => {
  return IsStrongPasswordValidator({}, { message: ResponseMessages[messageKey] });
};
