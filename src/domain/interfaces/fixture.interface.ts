import { ResponseMessagesKey } from "../enums/response-messages.enum";

export interface IFixture {
  field: string;
  title: string;
  value: any;
  message: ResponseMessagesKey;
}
