"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiProperty = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const ApiProperty = (name, example) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiProperty)({
        name,
        example,
    }), (0, class_transformer_1.Expose)({ name }));
};
exports.ApiProperty = ApiProperty;
//# sourceMappingURL=api-property.decorator.js.map