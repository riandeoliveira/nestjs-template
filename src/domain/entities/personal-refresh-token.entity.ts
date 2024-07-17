import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { User } from "./user.entity";

@Entity({ name: "personal_refresh_token" })
export class PersonalRefreshToken extends BaseEntity {
  @Column({
    name: "value",
    type: "text",
    unique: true,
  })
  @Index({ unique: true })
  public value: string;

  @Column({
    name: "expires_in",
    type: "int",
  })
  public expiresIn: number;

  @Column({
    name: "has_been_used",
    nullable: true,
    type: "boolean",
  })
  public hasBeenUsed: boolean | null = false;

  @ManyToOne(() => User, (user) => user.personalRefreshTokens)
  @JoinColumn({ name: "user_id" })
  public user: User;
}
