import * as Yup from "yup";

export const RegisterSchema = Yup.object({
    name: Yup.string()
        .required("Вкажіть ім'я"),  
    email: Yup.string()
        .email("Не коректно вказана пошта")
        .required("Вкажіть пошту"),

    password: Yup.string()
        .required('Вкажіть пароль.')
        .min(6, 'Пароль має містить мінімум 6 символів.'),
        //.matches(/[a-zA-Z]/, 'Пароль має містить латинські символи.'),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'), 
});