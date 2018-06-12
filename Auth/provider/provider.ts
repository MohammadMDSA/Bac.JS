import ProviderBase, { IProviderOptions } from "./providerBase";
import { Request, ResponseToolkit } from "hapi";
import { ValidationResult } from "hapi-auth-jwt2";
import { jwtDecode } from "../utils";
import { DecodeOptions } from "jsonwebtoken";
import User, { IUserModelDocument } from "../user";

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

	public SignUp(username: string, password: string, email: string): IUserModelDocument {

		if (!username) {
			throw new Error("Invalid username!");
		}

		if (!password) {
			throw new Error("Invalid password!");
		}

		if (!email) {
			throw new Error("Invalid email address!");
		}

		let user = new User({
			username: username,
			password: password,
			email: email
		});

		user.save;

		console.log(user);

		return user;
	}
}

export interface IDefaultProviderOptions extends IProviderOptions {
	secret: string;
}
