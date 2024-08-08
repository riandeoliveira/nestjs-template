import { ResponseMessagesKey } from "@/domain/enums/response-messages.enum";
import { Length } from "class-validator";

export const HasExactLength = (length: number, message: ResponseMessagesKey): PropertyDecorator => {
  return Length(length, length, { message });
};
