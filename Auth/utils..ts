import * as JWT from "jsonwebtoken";

export function jwtSign(message, key: JWT.Secret, options?: JWT.SignOptions): string {
    return JWT.sign(message, key, options);
}

export function jwtDecode(message: string, options?: JWT.DecodeOptions): null | { [key: string]: any } | string {
    return JWT.decode(message, options);
}

export async function jwtVerify(message: string, key: string | Buffer, options?: JWT.VerifyOptions): Promise<object | string> {
    return await JWT.verify(message, key, options);
}
