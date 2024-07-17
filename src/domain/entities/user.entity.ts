import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { PersonalRefreshToken } from "./personal-refresh-token.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Column({
    name: "email",
    type: "text",
    unique: true,
  })
  @Index({ unique: true })
  public email: string;

  @Column({
    name: "password",
    type: "text",
  })
  public password: string;

  @OneToMany(() => PersonalRefreshToken, (personalRefreshToken) => personalRefreshToken.user)
  public readonly personalRefreshTokens: PersonalRefreshToken[];
}
