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
exports.SignUpUserUseCase = void 0;
const personal_refresh_token_entity_1 = require("../../domain/entities/personal-refresh-token.entity");
const user_entity_1 = require("../../domain/entities/user.entity");
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const password_utility_1 = require("../../domain/utilities/password.utility");
const auth_service_1 = require("../../infrastructure/modules/auth/auth.service");
const personal_refresh_token_repository_1 = require("../../infrastructure/modules/repositories/personal-refresh-token.repository");
const user_repository_1 = require("../../infrastructure/modules/repositories/user.repository");
const common_1 = require("@nestjs/common");
let SignUpUserUseCase = class SignUpUserUseCase {
    constructor(authService, personalRefreshTokenRepository, userRepository) {
        this.authService = authService;
        this.personalRefreshTokenRepository = personalRefreshTokenRepository;
        this.userRepository = userRepository;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAlreadyExists = yield this.userRepository.findOne({
                email: request.email,
            });
            if (userAlreadyExists)
                throw new common_1.ConflictException(response_messages_enum_1.ResponseMessages.EMAIL_ALREADY_EXISTS);
            const hashedPassword = yield password_utility_1.PasswordUtility.hash(request.password);
            const user = new user_entity_1.User({
                email: request.email,
                password: hashedPassword,
            });
            yield this.userRepository.create(user);
            const tokenData = yield this.authService.generateTokenData(user.id);
            const { value, expiresIn } = tokenData.refreshToken;
            const personalRefreshToken = new personal_refresh_token_entity_1.PersonalRefreshToken({
                value,
                expiresIn,
                userId: user.id,
            });
            yield this.personalRefreshTokenRepository.create(personalRefreshToken);
            return tokenData;
        });
    }
};
exports.SignUpUserUseCase = SignUpUserUseCase;
exports.SignUpUserUseCase = SignUpUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        personal_refresh_token_repository_1.PersonalRefreshTokenRepository,
        user_repository_1.UserRepository])
], SignUpUserUseCase);
//# sourceMappingURL=sign-up-user.use-case.js.map