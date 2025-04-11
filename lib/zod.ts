import { z } from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, "Password must be at least 8 characters.")
    .regex(/[a-z]/, "Password must include a lowercase letter.")
    .regex(/[A-Z]/, "Password must include an uppercase letter.")
    .regex(/[0-9]/, "Password must include a number.")
    .regex(/[^a-zA-Z0-9]/, "Password must include a special character."),
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
})

export const SignInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, "Password must be at least 8 characters.")
    .regex(/[a-z]/, "Password must include a lowercase letter.")
    .regex(/[A-Z]/, "Password must include an uppercase letter.")
    .regex(/[0-9]/, "Password must include a number.")
    .regex(/[^a-zA-Z0-9]/, "Password must include a special character."),
})