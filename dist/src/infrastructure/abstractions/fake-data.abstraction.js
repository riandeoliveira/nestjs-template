"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeData = void 0;
const faker_1 = require("@faker-js/faker");
class FakeData {
    static accessToken() {
        const header = {
            alg: "HS256",
            typ: "JWT",
        };
        const payload = {
            userId: this.uuid(),
        };
        const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64");
        const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64");
        const signature = FakeData.integer(20);
        return `${encodedHeader}.${encodedPayload}.${signature}`;
    }
    static alphanumeric(length) {
        return faker_1.faker.string.alphanumeric(length);
    }
    static email() {
        return faker_1.faker.internet.email();
    }
    static integer(max) {
        return faker_1.faker.number.int(max);
    }
    static sentence() {
        return faker_1.faker.lorem.sentence();
    }
    static strongPassword() {
        return faker_1.faker.internet.password({ prefix: "$0" });
    }
    static uuid() {
        return faker_1.faker.string.uuid();
    }
}
exports.FakeData = FakeData;
//# sourceMappingURL=fake-data.abstraction.js.map