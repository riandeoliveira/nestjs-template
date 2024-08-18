import { IsNotEmpty } from "class-validator";
import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";

export const IsRequired = (messageKey: ResponseMessagesKey): PropertyDecorator => {
  return IsNotEmpty({ message: ResponseMessages[messageKey] });
};
