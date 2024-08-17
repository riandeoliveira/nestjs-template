"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = __importDefault(require("lodash"));
const operators_1 = require("rxjs/operators");
let SerializerInterceptor = class SerializerInterceptor {
    intercept(_context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => this.convertToSnakeCase(data)));
    }
    convertToSnakeCase(value) {
        if (lodash_1.default.isArray(value))
            return value.map((v) => this.convertToSnakeCase(v));
        if (lodash_1.default.isObject(value)) {
            return lodash_1.default.transform(value, (result, val, key) => {
                result[lodash_1.default.snakeCase(key)] = this.convertToSnakeCase(val);
            });
        }
        return value;
    }
};
exports.SerializerInterceptor = SerializerInterceptor;
exports.SerializerInterceptor = SerializerInterceptor = __decorate([
    (0, common_1.Injectable)()
], SerializerInterceptor);
//# sourceMappingURL=serializer.interceptor.js.map