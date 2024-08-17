"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonTestsUtility = void 0;
const fake_data_abstraction_1 = require("../../infrastructure/abstractions/fake-data.abstraction");
const main_e2e_spec_1 = require("../../main.e2e-spec");
const constants_1 = require("../constants");
const http_responses_1 = require("../constants/http-responses");
const response_messages_enum_1 = require("../enums/response-messages.enum");
class CommonTestsUtility {
    constructor(method, path) {
        this.method = method;
        this.path = path;
    }
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            const email = fake_data_abstraction_1.FakeData.email();
            const password = fake_data_abstraction_1.FakeData.strongPassword();
            const signUpUserResponse = yield main_e2e_spec_1.request.post("/user/sign-up").send({
                email,
                password,
            });
            const signUpUserBody = signUpUserResponse.body;
            const accessToken = `Bearer ${signUpUserBody.accessToken.value}`;
            return {
                accessToken,
                email,
                password,
                signUpUserBody,
            };
        });
    }
    includeAuthenticationTest() {
        it("Should throw an error when trying to access without being authenticated", () => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.requestBy(this.method, this.path);
            const { status, message } = http_responses_1.HttpResponses.UNAUTHORIZED;
            const body = response.body;
            expect(response.statusCode).toEqual(status);
            expect(body.type).toEqual(`${constants_1.PROBLEM_DETAILS_URI}/${status}`);
            expect(body.title).toEqual(response_messages_enum_1.ResponseMessages.UNAUTHORIZED_OPERATION);
            expect(body.status).toEqual(status);
            expect(body.detail).toEqual(message);
        }));
    }
    includeRateLimitTest() {
        it("Should throw an error when receiving too many requests", () => __awaiter(this, void 0, void 0, function* () {
            const responses = [];
            for (let i = 0; i < constants_1.MAXIMUM_REQUESTS_ALLOWED_PER_TTL + 1; i++) {
                const response = yield this.requestBy(this.method, this.path);
                responses.push(response);
            }
            const { status } = http_responses_1.HttpResponses.TOO_MANY_REQUESTS;
            const response = responses.find((response) => response.statusCode === status);
            const body = response.body;
            expect(response.statusCode).toEqual(status);
            expect(body.type).toEqual(`${constants_1.PROBLEM_DETAILS_URI}/${status}`);
            expect(body.title).toEqual(response_messages_enum_1.ResponseMessages.TOO_MANY_REQUESTS);
            expect(body.status).toEqual(status);
        }));
    }
    requestBy(method, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestMethods = {
                DELETE: yield main_e2e_spec_1.request.delete(path),
                GET: yield main_e2e_spec_1.request.get(path),
                POST: yield main_e2e_spec_1.request.post(path).send({}),
                PUT: yield main_e2e_spec_1.request.put(path).send({}),
            };
            return requestMethods[method];
        });
    }
}
exports.CommonTestsUtility = CommonTestsUtility;
//# sourceMappingURL=common-tests.utility.js.map