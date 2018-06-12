import user from "./user";
import { inspect } from "util";

export async function isEmailValid(email: string): Promise<IValidationResult> {
    let exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let res = exp.test(email.toLowerCase());
    if (!res) {
        return {
            result: false,
            message: "Invalid email address"
        };
    }

    let query = user.findOne({ email: email.toLowerCase() });
    let r = await query.exec();

    if (r) {
        return {
            result: false,
            message: "Email address already exists"
        };
    }

    return {
        result: true
    };
}

export function isPasswordValid(password: string): IValidationResult {

    if (password.length < 6) {
        return {
            result: false,
            message: "Password must be at least 6 characters long"
        };
    }

    let re = /[0-9]/;
    if (!re.test(password)) {
        return {
            result: false,
            message: "Password must contain at least one number (0-9)"
        };
    }
    re = /[a-z]/;
    if (!re.test(password)) {
        return {
            result: false,
            message: "Password must contain at least one lowercase letter (a-z)"
        };
    }
    re = /[A-Z]/;
    if (!re.test(password)) {
        return {
            result: false,
            message: "Password must contain at least one uppercase letter (A-Z)"
        };
    }

    return {
        result: true
    };
}

export async function isUsernameValid(username: string): Promise<IValidationResult> {
    console.log(username.length);

    if (username.length < 6) {
        return {
            result: false,
            message: "Username must be at least 6 characters long"
        };
    }

    let exp = new RegExp(username, "i");
    let query = user.findOne({ username: exp });
    let r = await query.exec();

    if (r) {
        return {
            result: false,
            message: "Username already exists"
        };
    }

    return {
        result: true
    };
}

export interface IValidationResult {
    result: boolean;
    message?: string;
}
