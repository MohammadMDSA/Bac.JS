import ProviderBase, { IProviderOptions } from "./providerBase";
import { Request, ResponseToolkit } from "hapi";
import { ValidationResult } from "hapi-auth-jwt2";
import { jwtDecode } from "../utils";
import { DecodeOptions } from "jsonwebtoken";
import User, { IUserModelDocument } from "../user";
import { isEmailValid, isPasswordValid, isUsernameValid } from "../validation";
import * as Boom from "boom";

export default class Provider extends ProviderBase<IDefaultProviderOptions> {

	constructor(options: IDefaultProviderOptions) {
		super(options);
	}

	public authenticateToken(token: string, options?: DecodeOptions): ValidationResult {

		let decoded = jwtDecode(token, options);

		return null;
	}

	public validateToken(token: string, secret: string): Promise<object | string> {
		return null;
	}

	public verify(decoded: any, request: Request, tk?: ResponseToolkit): ValidationResult | Promise<ValidationResult> {
		console.log("Validating");
		if (decoded.id === 1) {
			return {
				isValid: true,
				credentials: null
			};
		} else {
			return {
				isValid: false,
				credentials: null
			};
		}
	}

	public async SignUp(username: string, password: string, email: string): Promise<IUserModelDocument> {

		console.log(`inside sign in ${username} ${password} ${email}`);


		let res = await isUsernameValid(username);
		if (!res.result) {
			throw Boom.badRequest(res.message);
		}

		res = isPasswordValid(password);
		if (!res.result) {
			throw Boom.badRequest(res.message);
		}

		res = await isEmailValid(email);
		if (!res.result) {
			throw Boom.badRequest(res.message);
		}

		let user = new User({
			username: username,
			password: password,
			email: email.toLowerCase()
		});

		user.save();

		return user;
	}
}

export interface IDefaultProviderOptions extends IProviderOptions {
	secret: string;
}
