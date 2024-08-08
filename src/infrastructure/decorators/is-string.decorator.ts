import { ResponseMessagesKey } from "@/domain/enums/response-messages.enum";
import { IsString as IsStringValidator } from "class-validator";

export const IsString = (message: ResponseMessagesKey): PropertyDecorator => {
  return IsStringValidator({ message });
};
