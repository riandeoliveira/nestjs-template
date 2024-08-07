import { FakeData } from "@/infrastructure/abstractions/fake-data.abstraction";

export abstract class JwtUtility {
  public static generateFakeAccessToken(): string {
    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const payload = {
      userId: FakeData.uuid(),
    };

    const encodedHeader: string = Buffer.from(JSON.stringify(header)).toString("base64");
    const encodedPayload: string = Buffer.from(JSON.stringify(payload)).toString("base64");
    const signature: number = FakeData.integer(20);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
}
