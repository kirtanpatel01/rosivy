// lib\auth.action.ts

'use server'
import { FormValues, LoginFormState, RegisterFormState } from '@/types';
import { connectToMongoDb } from './db/connect';
import { User } from '@/models/User';
import { RegisterSchema } from './zod';
import { signIn } from '@/auth'; // make sure this path is correct
import { AuthError } from 'next-auth';
// import { redirect } from 'next/navigation';

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
        password
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

export async function loginUser(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const email = formData.get('email')?.toString() || '';
  const phone = formData.get('phone')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  // const identifier = email || phone;

  try {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      phone,
      password,
    });

    if (res?.error) {
      return {
        status: 'ERROR',
        msg: res.error,
        values: { email: email || '', phone: phone || '', password: '' }
      }
    }

    return {
      status: 'SUCCESS', // or 'ERROR'
      msg: 'Logged in successfully!',
      values: { email, phone, password },
    }

  } catch (err) {
    if (err instanceof AuthError) {
      return {
        status: 'ERROR',
        msg: 'Something went wrong while signing in.',
        values: { email: email || '', phone: phone || '', password: '' }
      }
    }

    throw err;
  }
}
