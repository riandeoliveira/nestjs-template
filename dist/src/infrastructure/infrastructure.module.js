"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./modules/auth/auth.module");
const mail_module_1 = require("./modules/mail/mail.module");
const prisma_module_1 = require("./modules/prisma/prisma.module");
const rate_limit_module_1 = require("./modules/rate-limit/rate-limit.module");
const repositories_module_1 = require("./modules/repositories/repositories.module");
let InfrastructureModule = class InfrastructureModule {
};
exports.InfrastructureModule = InfrastructureModule;
exports.InfrastructureModule = InfrastructureModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, mail_module_1.MailModule, prisma_module_1.PrismaModule, rate_limit_module_1.RateLimitModule, repositories_module_1.RepositoriesModule],
        exports: [auth_module_1.AuthModule, mail_module_1.MailModule, repositories_module_1.RepositoriesModule],
    })
], InfrastructureModule);
//# sourceMappingURL=infrastructure.module.js.map