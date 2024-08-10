"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trim = void 0;
const class_transformer_1 = require("class-transformer");
const lodash_1 = __importDefault(require("lodash"));
const Trim = () => {
    return (0, class_transformer_1.Transform)(({ value }) => (lodash_1.default.isString(value) ? value.trim() : value));
};
exports.Trim = Trim;
//# sourceMappingURL=trim.decorator.js.map