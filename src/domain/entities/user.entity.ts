import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Column({
    name: "email",
    type: "text",
    unique: true,
  })
  @Index()
  public email: string;

  @Column({
    name: "password",
    type: "text",
  })
  public password: string;
}
