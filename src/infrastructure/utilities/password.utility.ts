import * as bcrypt from "bcrypt";

export abstract class PasswordUtility {
  public static async hash(password: string): Promise<string> {
    const salts: string = await bcrypt.genSalt();

    return await bcrypt.hash(password, salts);
  }

  public static async verify(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
