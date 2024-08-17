"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const base_entity_1 = require("./base.entity");
class User extends base_entity_1.BaseEntity {
    constructor(props) {
        super();
        this.email = props.email;
        this.password = props.password;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map