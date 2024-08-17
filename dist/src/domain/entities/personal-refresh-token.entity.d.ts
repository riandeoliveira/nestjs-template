import { BaseEntity } from "./base.entity";
type PersonalRefreshTokenProps = {
    value: string;
    expiresIn: number;
    userId: string;
};
export declare class PersonalRefreshToken extends BaseEntity {
    constructor(props: PersonalRefreshTokenProps);
    value: string;
    expiresIn: number;
    hasBeenUsed: boolean;
    userId: string;
}
export {};
