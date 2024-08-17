export declare abstract class PasswordUtility {
    static hash(password: string): Promise<string>;
    static verify(password: string, hashedPassword: string): Promise<boolean>;
}
