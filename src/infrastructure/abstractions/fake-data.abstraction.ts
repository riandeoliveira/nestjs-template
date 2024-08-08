import { faker } from "@faker-js/faker";

export abstract class FakeData {
  public static accessToken(): string {
    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const payload = {
      userId: this.uuid(),
    };

    const encodedHeader: string = Buffer.from(JSON.stringify(header)).toString("base64");
    const encodedPayload: string = Buffer.from(JSON.stringify(payload)).toString("base64");
    const signature: number = FakeData.integer(20);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  public static alphanumeric(length: number): string {
    return faker.string.alphanumeric(length);
  }

  public static email(): string {
    return faker.internet.email();
  }

  public static integer(max: number): number {
    return faker.number.int(max);
  }

  public static sentence(): string {
    return faker.lorem.sentence();
  }

  public static strongPassword(): string {
    return faker.internet.password({ prefix: "$0" });
  }

  public static uuid(): string {
    return faker.string.uuid();
  }
}
