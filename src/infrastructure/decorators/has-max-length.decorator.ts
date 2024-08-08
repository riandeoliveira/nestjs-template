import { ResponseMessagesKey } from "@/domain/enums/response-messages.enum";
import { MaxLength } from "class-validator";

export const HasMaxLength = (max: number, message: ResponseMessagesKey): PropertyDecorator => {
  return MaxLength(max, { message });
};
