import { ResponseMessagesKey } from "@/domain/enums/response-messages.enum";
import { IsEmail as IsEmailValidator } from "class-validator";

export const IsEmail = (message: ResponseMessagesKey): PropertyDecorator => {
  return IsEmailValidator({}, { message });
};
