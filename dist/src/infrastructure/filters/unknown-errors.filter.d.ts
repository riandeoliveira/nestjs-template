import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
export declare class UnknownErrorsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
