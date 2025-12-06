import { z } from 'zod';

export const SignupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const ForgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export const ResetPasswordSchema = z.object({
    token: z.string().min(1, 'Token is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const VerifyEmailSchema = z.object({
    token: z.string().min(1, 'Token is required'),
});
