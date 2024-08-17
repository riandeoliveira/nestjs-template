export declare abstract class FakeData {
    static accessToken(): string;
    static alphanumeric(length: number): string;
    static email(): string;
    static integer(max: number): number;
    static sentence(): string;
    static strongPassword(): string;
    static uuid(): string;
}
