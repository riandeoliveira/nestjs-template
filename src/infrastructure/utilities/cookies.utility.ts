type TokenType = "access_token" | "refresh_token";

export abstract class CookiesUtility {
  public static getJwtTokenFromCookies(cookies: string[], tokenName: TokenType): string {
    const tokenMap: Record<TokenType, number> = {
      access_token: 0,
      refresh_token: 1,
    };

    const index: number = tokenMap[tokenName];

    return cookies[index].split(";")[0].split("=")[1];
  }
}
