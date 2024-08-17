"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorize = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../modules/auth/auth.guard");
const Authorize = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)("jwt"), (0, common_1.UseGuards)(auth_guard_1.AuthGuard));
};
exports.Authorize = Authorize;
//# sourceMappingURL=authorize.decorator.js.map