// app\auth\login\page.tsx

'use client'

import { SignInWithGoogle } from '@/components/sign-in'
import Link from 'next/link'
import React, { useState } from 'react'
import { handleLogin } from './actions'
import { ArrowLeftRight } from 'lucide-react';

const page = () => {
    const [loginField, setLoginField] = useState('email');
    const [swapHover, setSwapHover] = useState(false)

    const toggleField = () => {
        setLoginField(prev => prev === 'email' ? 'phone' : 'email')
    }

    return (
        <div className='fji min-h-screen p-4'>
            <div className='auth-cont w-full max-w-xl h-fit fci gap-8'>
                <h1>Login to <span className='text-p6'>Rosivy</span></h1>
                <form action={handleLogin} className='w-full max-w-md fci gap-8'>
                    <div className='w-full max-w-md fci relative'>
                        <button
                            type='button'
                            onClick={toggleField}
                            onMouseEnter={() => setSwapHover(prev => !prev)}
                            onMouseLeave={() => setSwapHover(prev => !prev)}
                            className='bg-p2 hover:bg-p4 rounded-t-xl flex items-center px-2 pt-1.5 pb-1 gap-1 text-xs absolute right-4 -top-[3px] cursor-pointer transition-all duration-300'>
                            <ArrowLeftRight
                                size={16}
                                className={`${swapHover ? "bg-p2 text-p6" : "bg-p4 text-p0"} transition-all duration-300 rounded-full p-0.5`}
                            />
                            {loginField === 'email' ? 'Phone' : 'Email'}
                        </button>
                        <label
                            htmlFor={loginField}
                            className='font-medium flex-1 self-start'>{loginField.charAt(0).toUpperCase() + loginField.slice(1)}:
                        </label>
                        <input
                            id={loginField}
                            type={loginField === 'email' ? 'text' : 'number'}
                            className="auth-input"
                            placeholder={'Enter your '+loginField}
                            name={loginField}
                        />
                    </div>
                    <div className='w-full max-w-md fci'>
                        <label
                            htmlFor='password'
                            className='font-medium flex-1 self-start'>Password:
                        </label>
                        <input
                            type='password'
                            className="auth-input"
                            placeholder={'Enter your password'}
                            name='password'
                        />
                    </div>
                    <button type='submit' className="primary-btn">
                        Login
                    </button>
                </form>
                <hr className='text-p6 w-full max-w-80 h-px' />
                <SignInWithGoogle />
                {/* <SignInWithResend /> */}
                <span>Don&apos;t have an account ? <Link href={'/auth/register'} className="text-p6 font-medium">Register</Link></span>
            </div>
        </div>
    )
}

export default page