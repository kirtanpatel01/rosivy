// lib\auth.action.ts

'use server'
import { FormValues, RegisterFormState } from '@/types';
import bcrypt from 'bcrypt';
import { connectToMongoDb } from './db/connect';
import { User } from '@/models/User';
import { RegisterSchema } from './zod';

export async function registerUser(prevState: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
    const email = formData.get('email')?.toString() || ''
    const phone = formData.get('phone')?.toString() || ''
    const password = formData.get('password')?.toString() || ''
    const confirmPassword = formData.get('confirmPassword')?.toString() || ''

    const result = RegisterSchema.safeParse({ email, phone, password, confirmPassword });

    if (!result.success) {
        const issue = result.error.issues[0]
        const error = issue?.message || 'Invalid form submission'
        const field = issue.path[0] as keyof FormValues

        return {
            status: 'ERROR',
            msg: error, field,
            values: { email, phone, password, confirmPassword }
        }
    }

    const hashedPassword = await bcrypt.hash(password, 16)

    await connectToMongoDb()

    const existedUser = await User.findOne({
        $or: [{ email }, { phone }]
    })

    if (existedUser) {
        return {
            status: 'ERROR',
            msg: 'User already exists with this email or phone number',
            values: { email, phone, password, confirmPassword }
        }
    }

    const user = await User.create({
        email,
        phone,
        password: hashedPassword
    })

    if(!user) {
        return {
            status: 'ERROR',
            msg: 'Error while creating user',
            values: { email, phone, password, confirmPassword }
        }
    }

    return {
        status: 'SUCCESS',
        msg: 'Registered successfully.',
        values: {
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
    }
}