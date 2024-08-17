"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemDetailsExtension = void 0;
const constants_1 = require("../../domain/constants");
const unknown_errors_filter_1 = require("../../infrastructure/filters/unknown-errors.filter");
const common_1 = require("@nestjs/common");
const lodash_1 = __importDefault(require("lodash"));
const nest_problem_details_filter_1 = require("nest-problem-details-filter");
class ProblemDetailsExtension {
    static configureWith(application) {
        const httpStatus = lodash_1.default.chain(common_1.HttpStatus)
            .values()
            .filter(lodash_1.default.isNumber)
            .keyBy(lodash_1.default.identity)
            .mapValues(lodash_1.default.toString)
            .value();
        application.useGlobalFilters(new unknown_errors_filter_1.UnknownErrorsFilter(), new nest_problem_details_filter_1.HttpExceptionFilter(constants_1.PROBLEM_DETAILS_URI, httpStatus));
    }
}
exports.ProblemDetailsExtension = ProblemDetailsExtension;
//# sourceMappingURL=problem-details.extension.js.map