import { ResponseMessages, ResponseMessagesKey } from "@/domain/enums/response-messages.enum";
import { IsEmail as IsEmailValidator } from "class-validator";

export const IsEmail = (messageKey: ResponseMessagesKey): PropertyDecorator => {
  return IsEmailValidator({}, { message: ResponseMessages[messageKey] });
};
