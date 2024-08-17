"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebApiModule = void 0;
const application_module_1 = require("../application/application.module");
const common_1 = require("@nestjs/common");
let WebApiModule = class WebApiModule {
};
exports.WebApiModule = WebApiModule;
exports.WebApiModule = WebApiModule = __decorate([
    (0, common_1.Module)({
        imports: [application_module_1.ApplicationModule],
    })
], WebApiModule);
//# sourceMappingURL=web-api.module.js.map