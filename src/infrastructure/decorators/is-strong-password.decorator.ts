import { IsStrongPassword as IsStrongPasswordValidator } from "class-validator";
import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";

export const IsStrongPassword = (messageKey: ResponseMessagesKey): PropertyDecorator => {
  return IsStrongPasswordValidator({}, { message: ResponseMessages[messageKey] });
};
