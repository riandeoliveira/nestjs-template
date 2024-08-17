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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const response_messages_enum_1 = require("../../../domain/enums/response-messages.enum");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const prisma_service_1 = require("../prisma/prisma.service");
let UserRepository = class UserRepository {
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.user.create({ data: user });
        });
    }
    findCurrentOrThrow() {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = this.authService.getCurrentUserId();
            return yield this.findOneOrThrow({ id: userId, deletedAt: null });
        });
    }
    findFirst(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.user.findFirst({
                where,
            });
        });
    }
    findFirstOrThrow(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const personalRefreshToken = yield this.findFirst(where);
            if (!personalRefreshToken)
                throw new common_1.NotFoundException(response_messages_enum_1.ResponseMessages.PERSONAL_REFRESH_TOKEN_NOT_FOUND);
            return personalRefreshToken;
        });
    }
    findOne(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.user.findUnique({
                where,
            });
        });
    }
    findOneOrThrow(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne(where);
            if (!user)
                throw new common_1.NotFoundException(response_messages_enum_1.ResponseMessages.USER_NOT_FOUND);
            return user;
        });
    }
    hardDelete(where) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.user.delete({
                where,
            });
        });
    }
    softDelete(where) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.user.update({
                where,
                data: {
                    deletedAt: new Date(),
                },
            });
        });
    }
    softDeleteMany(where) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.user.updateMany({
                where,
                data: {
                    deletedAt: new Date(),
                },
            });
        });
    }
    update(where, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = data, rest = __rest(data, ["id"]);
            yield this.prisma.user.update({
                where,
                data: Object.assign({ updatedAt: new Date() }, rest),
            });
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map