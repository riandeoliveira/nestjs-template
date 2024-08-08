import { ResponseMessagesKey } from "@/domain/enums/response-messages.enum";
import { IsNotEmpty } from "class-validator";

export const IsRequired = (message: ResponseMessagesKey): PropertyDecorator => {
  return IsNotEmpty({ message });
};
