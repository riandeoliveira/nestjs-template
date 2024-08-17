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
exports.UpdateUserUseCase = void 0;
const response_messages_enum_1 = require("../../domain/enums/response-messages.enum");
const password_utility_1 = require("../../domain/utilities/password.utility");
const user_repository_1 = require("../../infrastructure/modules/repositories/user.repository");
const common_1 = require("@nestjs/common");
let UpdateUserUseCase = class UpdateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const isRequestEmpty = !request.email && !request.password;
            if (isRequestEmpty)
                throw new common_1.BadRequestException(response_messages_enum_1.ResponseMessages.REQUEST_IS_EMPTY);
            const user = yield this.userRepository.findCurrentOrThrow();
            if (request.email) {
                const existingUser = yield this.userRepository.findFirst({
                    id: {
                        not: user.id,
                    },
                    email: request.email,
                });
                if (existingUser)
                    throw new common_1.ConflictException(response_messages_enum_1.ResponseMessages.EMAIL_ALREADY_EXISTS);
                user.email = request.email;
            }
            if (request.password) {
                const hashedPassword = yield password_utility_1.PasswordUtility.hash(request.password);
                user.password = hashedPassword;
            }
            yield this.userRepository.update({
                id: user.id,
                deletedAt: null,
            }, user);
        });
    }
};
exports.UpdateUserUseCase = UpdateUserUseCase;
exports.UpdateUserUseCase = UpdateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UpdateUserUseCase);
//# sourceMappingURL=update-user.use-case.js.map