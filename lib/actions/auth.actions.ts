'use server'

import bcrypt from 'bcrypt';
import { RegisterSchema } from '../zod';

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
