// components\sign-in.tsx

import { handleGoogleLogin, handleResendLogin } from "@/app/auth/login/actions"

export function SignInWithGoogle() {
  return (
    <form
      action={handleGoogleLogin}
    >
      <button className="border border-slate-300 hover:bg-slate-400/5 cursor-pointer rounded-md flex items-center gap-2 p-2" type="submit">
        <span className="font-medium">Sign-in with</span>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" className="size-5" />
      </button>
    </form>
  )
} 

export function SignInWithResend() {
  return (
    <form
      className="space-y-2"
      action={handleResendLogin}
    >
      <input type="text" name="email" placeholder="Email" />
      <button type="submit" className="cursor-pointer p-2 border-2 border-slate-400 rounded-lg bg-slate-100 hover:bg-slate-200">Signin with Resend</button>
    </form>
  )
}
