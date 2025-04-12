// models\User.ts

import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    email: string;
    phone: string
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true},
        phone: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }, 
    { timestamps: true }
)

userSchema.pre('save', async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

export const User = models?.User || model<IUser>('User', userSchema);