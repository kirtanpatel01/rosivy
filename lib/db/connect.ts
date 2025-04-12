import mongoose from "mongoose";
import client from "./config";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI) {
    throw new Error('Please define mongodb uri in env variables')
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToMongoDb() {
    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }

        console.log(MONGODB_URI)
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("MongoDB connected");
            return mongoose.connection;
          });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error
    }

    return cached.conn
} 