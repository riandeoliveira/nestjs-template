import { HttpSuccessResponsesKey } from "@/domain/constants/http-responses";
import { Type } from "@nestjs/common";
type ApiSuccessResponseType = Type<unknown> | Function | [Function] | string;
export declare const ApiSuccessResponse: (key: HttpSuccessResponsesKey, type?: ApiSuccessResponseType) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
