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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.AuthService = void 0;
const constants_1 = require("../../../domain/constants");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(jwtService, request) {
        this.jwtService = jwtService;
        this.request = request;
    }
    generateTokenData(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                userId,
                jti: (0, crypto_1.randomUUID)(),
            };
            const accessToken = yield this.jwtService.signAsync(payload, {
                expiresIn: constants_1.ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
            });
            const refreshToken = yield this.jwtService.signAsync(payload, {
                expiresIn: constants_1.REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
            });
            return {
                userId,
                accessToken: {
                    value: accessToken,
                    expiresIn: constants_1.ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
                },
                refreshToken: {
                    value: refreshToken,
                    expiresIn: constants_1.REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
                },
            };
        });
    }
    getCurrentUserId() {
        return this.request.currentUserId;
    }
    validateTokenOrThrow(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            return true;
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [jwt_1.JwtService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map