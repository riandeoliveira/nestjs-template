import { BaseEntity } from "./base.entity";

type UserProps = {
  email: string;
  password: string;
};

export class User extends BaseEntity {
  public constructor(props: UserProps) {
    super();

    this.email = props.email;
    this.password = props.password;
  }

  public email: string;

  public password: string;
}
