"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotUserPasswordModule = void 0;
const infrastructure_module_1 = require("../../infrastructure/infrastructure.module");
const common_1 = require("@nestjs/common");
const forgot_user_password_endpoint_1 = require("./forgot-user-password.endpoint");
const forgot_user_password_use_case_1 = require("./forgot-user-password.use-case");
let ForgotUserPasswordModule = class ForgotUserPasswordModule {
};
exports.ForgotUserPasswordModule = ForgotUserPasswordModule;
exports.ForgotUserPasswordModule = ForgotUserPasswordModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        controllers: [forgot_user_password_endpoint_1.ForgotUserPasswordEndpoint],
        providers: [forgot_user_password_use_case_1.ForgotUserPasswordUseCase],
    })
], ForgotUserPasswordModule);
//# sourceMappingURL=forgot-user-password.module.js.map