import { Connection } from "mongoose";

interface ProductCard {
    id: string;
    image: string;
    name: string;
    price: string;
}

interface FormValues {
    email: string;
    phone: string;
    password: string;
    confirmPassword: string
}

interface RegisterFormState {
    status: "SUCCESS" | "ERROR" | "";
    msg: string;
    values: FormValues;
    field?: keyof FormValues;
}

interface LoginFormState {
    status: "SUCCESS" | "ERROR" | "";
    msg: string;
    values: {
        email: string,
        phone: string,
        password: string,
    };
}

declare global {
    var mongoose: {
        conn: Connection | null
        promise: Promise<Connection> | null
    }
}

