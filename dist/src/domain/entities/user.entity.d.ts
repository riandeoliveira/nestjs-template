import { BaseEntity } from "./base.entity";
type UserProps = {
    email: string;
    password: string;
};
export declare class User extends BaseEntity {
    constructor(props: UserProps);
    email: string;
    password: string;
}
export {};
