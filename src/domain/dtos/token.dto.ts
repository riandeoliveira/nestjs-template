import { ObjectId } from "typeorm";

interface ExpirableTokenDto {
  value: string;
  expiresIn: number;
}

export interface TokenDto {
  userId: ObjectId;
  accessToken: ExpirableTokenDto;
  refreshToken: ExpirableTokenDto;
}
