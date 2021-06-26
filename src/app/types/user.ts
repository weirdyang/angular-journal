export interface Profile {
    username: string;
    following: boolean;
    avatar: string;
}

export interface IUser {
    id: string;
    email: string;
    username: string;
    avatar: string;
}

export interface ILogin {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface IArcstoneLogin {
    username: string;
    password: string;
    rememberMe: boolean;
}
export interface IUserToken {
    accessToken: string;
    username: string;
}
export class RegisterUser {
    password!: string;
    username!: string;
    email!: string;
    confirmPassword!: string;
}

export interface IApiResponse {
    message: string;
    hasError: boolean;
}