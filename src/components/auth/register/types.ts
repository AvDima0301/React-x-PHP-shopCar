export interface IRegisterModel {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    image: string;
}

export interface IRegisterResult {
    message: string;
}