import { ResponseMessagesKey } from "@/domain/enums/response-messages.enum";
import { IsStrongPassword as IsStrongPasswordValidator } from "class-validator";

export const IsStrongPassword = (message: ResponseMessagesKey): PropertyDecorator => {
  return IsStrongPasswordValidator({}, { message });
};
