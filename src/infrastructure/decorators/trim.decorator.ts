import { Transform } from "class-transformer";
import _ from "lodash";

export const Trim = (): PropertyDecorator => {
  return Transform(({ value }) => (_.isString(value) ? value.trim() : value));
};
