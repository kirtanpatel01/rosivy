'use client'

import { registerUser } from '@/lib/auth.action'
import Link from 'next/link'
import { useState, useEffect, useActionState, ChangeEvent } from 'react'
import { Eye, EyeClosed } from 'lucide-react';
import { RegisterFormState } from '@/types';

const initialState: RegisterFormState = {
    status: '',
    msg: '',
    values: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    },
}

const RegisterForm = () => {
    const [formValues, setFormValues] = useState(initialState.values)
    const [state, formAction, pending] = useActionState(registerUser, initialState)
    const [msg, setMsg] = useState(state.msg)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const inputs = [
        {
            label: 'Name',
            type: 'text',
            placeholder: 'Enter your name...',
            name: 'name',
        },
        {
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email...',
            name: 'email',
        },
        {
            label: 'Password',
            type: showPassword ? 'text' : 'password',
            placeholder: 'Enter the password...',
            name: 'password',
            showToggle: true,
            toggleHandler: () => setShowPassword(prev => !prev),
            visible: showPassword
        },
        {
            label: 'Confirm Password',
            type: showConfirmPassword ? "text" : 'password',
            placeholder: 'Confirm your password...',
            name: 'confirmPassword',
            showToggle: true,
            toggleHandler: () => setShowConfirmPassword(prev => !prev),
            visible: showConfirmPassword
        },
    ]

    useEffect(() => {
        setMsg(state.msg)

        if (state.status === 'SUCCESS') {
            setFormValues({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }

        if (state.field) {
            const field = document.querySelector<HTMLInputElement>(`input[name="${state.field}"]`)
            field?.focus()
        }
    }, [state])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues(prev => ({ ...prev, [name]: value }))
        if (msg) setMsg('')
    }

    return (
        <div className='fji min-h-screen'>
            <div className='auth-cont w-full max-w-xl h-fit fci gap-8'>
                <h1>Register to <span className='text-p6'>Rosivy</span></h1>
                <form action={formAction} className='w-full max-w-md fci gap-8'>
                    {inputs.map((input) => (
                        <li key={input.name} className='w-full max-w-md fci relative'>
                            <label htmlFor={input.name} className='font-medium flex-1 self-start'>{input.label}</label>
                            <input
                                spellCheck={false}
                                type={input.type}
                                className="auth-input"
                                name={input.name}
                                value={formValues[input.name as keyof typeof formValues]}
                                onChange={handleChange}
                                placeholder={input.placeholder} />
                            {input.showToggle && (
                                <span
                                    className='absolute text-p6 right-3 top-10 cursor-pointer'
                                    onClick={input.toggleHandler}>
                                    {input.visible ? <EyeClosed size={18} /> : <Eye size={18} />}
                                </span>
                            )}
                            {state.field === input.name && (
                                <span className="text-red-500 text-sm">{state.msg}</span>
                            )}
                        </li>
                    ))}
                   
                    <button type='submit' disabled={pending} className={`primary-btn flex items-center justify-center gap-2 ${pending ? 'cursor-not-allowed' : "cursor-pointer" }`}>
                        {pending && (
                            <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                        )}
                        {pending ? "Registering..." : 'Register'}
                    </button>

                </form>

                <hr className='text-p6 w-full max-w-80 h-px' />
                <span>Already have an account ? <Link href={'/auth/login'} className="text-p6 font-medium">Login</Link></span>
            </div>
        </div>
    )
}

export default RegisterForm