import { SignInWithGoogle, SignInWithResend } from '@/components/sign-in'
import Link from 'next/link'
import React from 'react'

const page = () => {
    const inputs = [
        {
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email...',
            name: 'email',
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter the password...',
            name: 'password',
        },
    ]

    return (
        <div className='fji min-h-screen p-4'>
            <div className='auth-cont w-full max-w-xl h-fit fci gap-8'>
                <h1>Login to <span className='text-p6'>Rosivy</span></h1>
                <form className='w-full max-w-md fci gap-8'>
                    {inputs.map((input) => (
                        <li key={input.name} className='w-full max-w-md fci'>
                            <label htmlFor={input.name} className='font-medium flex-1 self-start'>{input.label}:</label>
                            <input type={input.type} className="auth-input" placeholder={input.placeholder} />
                        </li>
                    ))}
                    <button className="primary-btn">
                        Login
                    </button>
                </form>
                <hr className='text-p6 w-full max-w-80 h-px'/>
                <SignInWithGoogle />
                <SignInWithResend />
                <span>Don't have an account ? <Link href={'/auth/register'} className="text-p6 font-medium">Register</Link></span>
            </div>
        </div>
    )
}

export default page