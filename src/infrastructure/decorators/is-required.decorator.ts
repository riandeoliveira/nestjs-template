import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";
import { IsNotEmpty } from "class-validator";

export const IsRequired = (messageKey: ResponseMessagesKey): PropertyDecorator => {
  return IsNotEmpty({ message: ResponseMessages[messageKey] });
};
