'use server'

import bcrypt from 'bcrypt';
import { z } from "zod";

const RegisterSchema = z.object({
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

export async function registerUser(
    prevState: RegisterFormState, 
    formData: FormData): Promise<RegisterFormState> {

    const name = formData.get('name')?.toString() || ''
    const email = formData.get('email')?.toString() || ''
    const password = formData.get('password')?.toString() || ''
    const confirmPassword = formData.get('confirmPassword')?.toString() || ''

    const result = RegisterSchema.safeParse({ 
        name, 
        email, 
        password, 
        confirmPassword 
    });

    if (!result.success) {
        const issue = result.error.issues[0]
        const error = issue?.message || 'Invalid form submission'
        const field = issue.path[0] as keyof FormValues

        return { 
            status: 'ERROR', 
            msg: error, 
            field,
            values: { name, email, password, confirmPassword } }
    }

    const hashedPassword = await bcrypt.hash(password, 16)
    console.log(hashedPassword)
    
    return { 
        status: 'SUCCESS', 
        msg: 'Registered successfully.', 
        values: { 
            name: '', 
            email: '', 
            password: '', 
            confirmPassword: '' 
        },
    }
}
