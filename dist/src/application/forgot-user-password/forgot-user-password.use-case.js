"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.ForgotUserPasswordUseCase = void 0;
const auth_service_1 = require("../../infrastructure/modules/auth/auth.service");
const mail_service_1 = require("../../infrastructure/modules/mail/mail.service");
const user_repository_1 = require("../../infrastructure/modules/repositories/user.repository");
const common_1 = require("@nestjs/common");
let ForgotUserPasswordUseCase = class ForgotUserPasswordUseCase {
    constructor(authService, mailService, userRepository) {
        this.authService = authService;
        this.mailService = mailService;
        this.userRepository = userRepository;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneOrThrow({
                email: request.email,
                deletedAt: null,
            });
            const tokenData = yield this.authService.generateTokenData(user.id);
            yield this.mailService.sendMail({
                from: process.env.MAIL_SENDER,
                to: user.email,
                subject: "Password Reset Request",
                template: "./forgot-user-password.template.hbs",
                context: {
                    model: {
                        email: user.email,
                        accessToken: tokenData.accessToken.value,
                        clientUrl: process.env.CLIENT_URL,
                    },
                },
            });
        });
    }
};
exports.ForgotUserPasswordUseCase = ForgotUserPasswordUseCase;
exports.ForgotUserPasswordUseCase = ForgotUserPasswordUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        mail_service_1.MailService,
        user_repository_1.UserRepository])
], ForgotUserPasswordUseCase);
//# sourceMappingURL=forgot-user-password.use-case.js.map