interface ProductCard {
    id: string;
    image: string;
    name: string;
    price: string;
}

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string
}

interface RegisterFormState {
    status: "SUCCESS" | "ERROR" | "";
    msg: string;
    values: FormValues;
    field?: keyof FormValues;
}