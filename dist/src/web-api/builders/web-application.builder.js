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
exports.WebApplicationBuilder = void 0;
const core_1 = require("@nestjs/core");
const documentation_extension_1 = require("../extensions/documentation.extension");
const problem_details_extension_1 = require("../extensions/problem-details.extension");
const validation_extension_1 = require("../extensions/validation.extension");
const web_api_module_1 = require("../web-api.module");
class WebApplicationBuilder {
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            this.application = yield core_1.NestFactory.create(web_api_module_1.WebApiModule);
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.application.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : process.env.API_PORT);
        });
    }
    configureDocumentation() {
        documentation_extension_1.DocumentationExtension.configureWith(this.application);
    }
    configureProblemDetails() {
        problem_details_extension_1.ProblemDetailsExtension.configureWith(this.application);
    }
    configureValidation() {
        validation_extension_1.ValidationExtension.configureWith(this.application);
    }
}
exports.WebApplicationBuilder = WebApplicationBuilder;
//# sourceMappingURL=web-application.builder.js.map