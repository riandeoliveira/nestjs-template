import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Column({
    name: "email",
    type: "string",
    unique: true,
  })
  @Index()
  public email: string;

  @Column({
    name: "password",
    type: "string",
  })
  public password: string;
}
