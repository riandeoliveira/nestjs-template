import _ from "lodash";

export abstract class StringUtility {
  public static toCamelCase(text: string): string {
    return _.camelCase(text);
  }
}
