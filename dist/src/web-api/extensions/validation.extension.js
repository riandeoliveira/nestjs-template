"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExtension = void 0;
const common_1 = require("@nestjs/common");
class ValidationExtension {
    static configureWith(application) {
        application.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
        }));
    }
}
exports.ValidationExtension = ValidationExtension;
//# sourceMappingURL=validation.extension.js.map