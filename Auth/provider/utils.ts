import * as JWT from "jsonwebtoken";
import { ITokenObject } from "../provider/provider";

export function jwtSign(message: ITokenObject, key: JWT.Secret, options?: JWT.SignOptions): string {
    return JWT.sign(message, key, options);
}

export function jwtDecode(message: string, options?: JWT.DecodeOptions): null | { [key: string]: any } | string {
    return JWT.decode(message, options);
}

export async function jwtVerify(message: string, key: string | Buffer, options?: JWT.VerifyOptions): Promise<object | string> {
    return await JWT.verify(message, key, options);
}

export function getIP(request) {
    return request.ip || request.headers["x-real-ip"] || request.headers["x-forwarded-for"] || request.info["remoteAddress"];
}
