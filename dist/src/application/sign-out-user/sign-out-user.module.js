"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignOutUserModule = void 0;
const infrastructure_module_1 = require("../../infrastructure/infrastructure.module");
const common_1 = require("@nestjs/common");
const sign_out_user_endpoint_1 = require("./sign-out-user.endpoint");
const sign_out_user_use_case_1 = require("./sign-out-user.use-case");
let SignOutUserModule = class SignOutUserModule {
};
exports.SignOutUserModule = SignOutUserModule;
exports.SignOutUserModule = SignOutUserModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        controllers: [sign_out_user_endpoint_1.SignOutUserEndpoint],
        providers: [sign_out_user_use_case_1.SignOutUserUseCase],
    })
], SignOutUserModule);
//# sourceMappingURL=sign-out-user.module.js.map