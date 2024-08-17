"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalRefreshToken = void 0;
const base_entity_1 = require("./base.entity");
class PersonalRefreshToken extends base_entity_1.BaseEntity {
    constructor(props) {
        super();
        this.value = props.value;
        this.expiresIn = props.expiresIn;
        this.hasBeenUsed = false;
        this.userId = props.userId;
    }
}
exports.PersonalRefreshToken = PersonalRefreshToken;
//# sourceMappingURL=personal-refresh-token.entity.js.map