"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const serializer_interceptor_1 = require("./infrastructure/interceptors/serializer.interceptor");
const web_application_builder_1 = require("./web-api/builders/web-application.builder");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const builder = new web_application_builder_1.WebApplicationBuilder();
    yield builder.create();
    builder.application.setGlobalPrefix("api");
    builder.application.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
    });
    builder.configureDocumentation();
    builder.configureProblemDetails();
    builder.configureValidation();
    builder.application.useGlobalInterceptors(new serializer_interceptor_1.SerializerInterceptor());
    yield builder.run();
}))();
//# sourceMappingURL=main.js.map