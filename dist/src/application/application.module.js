"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const delete_user_module_1 = require("./delete-user/delete-user.module");
const forgot_user_password_module_1 = require("./forgot-user-password/forgot-user-password.module");
const renew_user_refresh_token_module_1 = require("./renew-user-refresh-token/renew-user-refresh-token.module");
const reset_user_password_module_1 = require("./reset-user-password/reset-user-password.module");
const sign_in_user_module_1 = require("./sign-in-user/sign-in-user.module");
const sign_out_user_module_1 = require("./sign-out-user/sign-out-user.module");
const sign_up_user_module_1 = require("./sign-up-user/sign-up-user.module");
const update_user_module_1 = require("./update-user/update-user.module");
const verify_current_user_module_1 = require("./verify-current-user/verify-current-user.module");
let ApplicationModule = class ApplicationModule {
};
exports.ApplicationModule = ApplicationModule;
exports.ApplicationModule = ApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            delete_user_module_1.DeleteUserModule,
            forgot_user_password_module_1.ForgotUserPasswordModule,
            renew_user_refresh_token_module_1.RenewUserRefreshTokenModule,
            reset_user_password_module_1.ResetUserPasswordModule,
            sign_in_user_module_1.SignInUserModule,
            sign_out_user_module_1.SignOutUserModule,
            sign_up_user_module_1.SignUpUserModule,
            update_user_module_1.UpdateUserModule,
            verify_current_user_module_1.VerifyCurrentUserModule,
        ],
    })
], ApplicationModule);
//# sourceMappingURL=application.module.js.map