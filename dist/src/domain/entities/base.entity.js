"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const node_crypto_1 = require("node:crypto");
class BaseEntity {
    constructor() {
        this.id = (0, node_crypto_1.randomUUID)();
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
}
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base.entity.js.map