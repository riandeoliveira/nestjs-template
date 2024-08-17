import { ResponseMessages } from "@/domain/enums/response-messages.enum";
export declare const updateUserFixture: ({
    field: string;
    title: string;
    value: string;
    message: ResponseMessages;
} | {
    field: string;
    title: string;
    value: number;
    message: ResponseMessages;
})[];
