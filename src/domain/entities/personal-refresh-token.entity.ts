import { BaseEntity } from "./base.entity";

type PersonalRefreshTokenProps = {
  value: string;
  expiresIn: number;
  userId: string;
};

export class PersonalRefreshToken extends BaseEntity {
  public constructor(props: PersonalRefreshTokenProps) {
    super();

    this.value = props.value;
    this.expiresIn = props.expiresIn;
    this.hasBeenUsed = false;
    this.userId = props.userId;
  }

  public value: string;

  public expiresIn: number;

  public hasBeenUsed: boolean;

  public userId: string;
}
