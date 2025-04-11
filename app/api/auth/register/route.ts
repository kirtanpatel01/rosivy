import bcrypt from 'bcrypt';
import { parseServerActionResponse } from "@/lib/utils";
import { z } from "zod";

const RegisterSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(16, 'Password can&#39;t be more than 16 characters'),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword'],
    })

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword')?.toString()

        const result = RegisterSchema.safeParse({ 
            name, 
            email, 
            password, 
            confirmPassword 
        });

        if (!result.success) {
            const errrorMsg = result.error.issues.map(issue => issue.message).join(',')
            return { status: 'ERROR', msg: errrorMsg }
        }

        const hashedPassword = await bcrypt.hash(password, 16);

        return parseServerActionResponse({
            data: { name, email, hashedPassword },
            error: '',
            status: 'SUCCESS'
        })

    } catch (error) {
        console.error(error);

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: 'ERROR'
        })
    }
}