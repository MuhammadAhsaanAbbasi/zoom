import * as z from "zod";

export const RegisterSchema = z.object({
    firstname: z.string().min(3, {
        message: "First name must be at least 3 characters long.",
    }),
    lastname: z.string().min(3, {
        message: "Last name must be at least 3 characters long.",
    }),
    dob: z.string({
        required_error: "Date of birth is required.",
    }),
    gender: z.string().min(4, {
        message: "Gender must be at least 4 characters long.",
    }),
    email: z.string().email({
        message: "Please provide a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please provide a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
});

// export const VerifySchema = z.object({
//     otp: z.string().length(6, {
//         message: "OTP must be 6 characters long.",
//     }),
//     token: z.string({
//         required_error: "Token is required.",
//     }),
// });

// export const ResetSchema = z.object({
//     email: z.string().email({
//         message: "Please provide a valid email address.",
//     }),
// });

// export const ResetPasswordSchema = z.object({
//     token: z.string({
//         required_error: "Token is required.",
//     }),
//     newPassword: z.string().min(8, {
//         message: "Password must be at least 8 characters long.",
//     }),
//     confirmPassword: z.string().min(8, {
//         message: "Password must be at least 8 characters long.",
//     }),
// });