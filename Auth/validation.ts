export function isEmailValid(email: string): boolean {
    let exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return exp.test(email.toLowerCase());
}

export function isPasswordValid(password: string): boolean {
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long!");
    }

    let re = /[0-9]/;
    if (!re.test(password)) {
        throw new Error("Password must contain at least one number (0-9)!");
    }
    re = /[a-z]/;
    if (!re.test(password)) {
        throw new Error("Password must contain at least one lowercase letter (a-z)!");
    }
    re = /[A-Z]/;
    if (!re.test(password)) {
        throw new Error("Password must contain at least one uppercase letter (A-Z)!");
    }

    return true;
}
