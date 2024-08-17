"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenewUserRefreshTokenModule = void 0;
const infrastructure_module_1 = require("../../infrastructure/infrastructure.module");
const common_1 = require("@nestjs/common");
const renew_user_refresh_token_endpoint_1 = require("./renew-user-refresh-token.endpoint");
const renew_user_refresh_token_use_case_1 = require("./renew-user-refresh-token.use-case");
let RenewUserRefreshTokenModule = class RenewUserRefreshTokenModule {
};
exports.RenewUserRefreshTokenModule = RenewUserRefreshTokenModule;
exports.RenewUserRefreshTokenModule = RenewUserRefreshTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        controllers: [renew_user_refresh_token_endpoint_1.RenewUserRefreshTokenEndpoint],
        providers: [renew_user_refresh_token_use_case_1.RenewUserRefreshTokenUseCase],
    })
], RenewUserRefreshTokenModule);
//# sourceMappingURL=renew-user-refresh-token.module.js.map