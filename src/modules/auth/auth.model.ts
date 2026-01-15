import { I_User } from '../user/user.model';

export interface I_Auth {
    user: I_User;
    token: string;
}
