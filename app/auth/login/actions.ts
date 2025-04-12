// app\auth\login\actions.ts

'use server'

import { signIn } from '@/auth'

export async function handleLogin(formData: FormData) {
  await signIn('credentials', formData)
}

export async function handleGoogleLogin() {
    await signIn("google", { redirectTo: '/' })
}

export async function handleResendLogin(formData: FormData) {
    await signIn("resend", formData)
}

