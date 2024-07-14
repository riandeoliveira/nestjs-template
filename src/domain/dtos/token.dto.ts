import { UserDto } from "./user.dto";

interface ExpirableTokenDto {
  value: string;
  expiresIn: number;
}

export interface TokenDto {
  userId: string;
  accessToken: ExpirableTokenDto;
  refreshToken: ExpirableTokenDto;
}

export interface TokenPayloadDto extends UserDto {
  iat: number;
  exp: number;
}
