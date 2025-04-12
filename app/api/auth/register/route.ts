import { connectToMongoDb } from "@/lib/db/connect";
import { RegisterSchema } from "@/lib/zod";
import { User } from "@/models/User";
import { FormValues } from "@/types";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod"; 

export async function POST(req: NextRequest) {
    try {
        const { email, phone, password, confirmPassword } = await req.json();

        console.log(String(phone).length)
        const result = RegisterSchema.safeParse({
            email,
            phone,
            password,
            confirmPassword
        })

        if(!result.success) {
            const issue = result.error.issues[0]
            const error = issue?.message || 'Invalid form submission'
            const field = issue.path[0] as keyof FormValues

            return NextResponse.json(
                {error},
                {status: 409}
            )
        }

        await connectToMongoDb()

        const existedUser = await User.findOne({ 
            $or: [ {email}, {phone} ] 
        })

        if(existedUser) {
            return NextResponse.json(
                {error: 'User already exits with this number or email'},
                {status: 401}
            )
        }

        await User.create({
            email,
            phone,
            password
        })


        return NextResponse.json(
            { message: 'User created successfully!' },
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: error || 'Failed to register user!' },
            { status: 500 }
        )
    }
}