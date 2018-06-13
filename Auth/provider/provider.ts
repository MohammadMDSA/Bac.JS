import ProviderBase, { IProviderOptions } from "./providerBase";
import { Request, ResponseToolkit } from "hapi";
import { ValidationResult } from "hapi-auth-jwt2";
import { jwtDecode, jwtSign } from "../utils";
import { DecodeOptions } from "jsonwebtoken";
import User, { IUserModelDocument } from "../user";
import { isEmailValid, isPasswordValid, isUsernameValid } from "../validation";
import * as Boom from "boom";
import { IAuthOptions } from "..";

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
		
		return {
			isValid: true
		};
	}

	public async signUp(_username: string = "", _password: string = "", _email: string = ""): Promise<IUserModelDocument> {

		console.log(`inside sign in ${_username} ${_password} ${_email}`);

		let email = String(_email);
		let password = String(_password);
		let username = String(_username);

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

	public async login({ username, password }: ILoginInputs): Promise<ILoginnResponse> {

		let user = await this.findByUsername(username);

		console.log(user);

		if (!user) {
			throw Boom.unauthorized("Invalid username or password");
		}

		if (user.password !== password) {
			throw Boom.unauthorized("Invalid username or password");
		}

		let token = jwtSign({
			email: user.email,
			username: user.username
		}, this._options.secret);

		return {
			tokekn: token
		};
	}

	private async findByUsername(username: string): Promise<IUserModelDocument> {
		let exp = new RegExp("^" + username + "$", "i");
		let query = User.findOne({ username: exp });
		let r = await query.exec();

		return r;
	}

}

export interface IDefaultProviderOptions extends IProviderOptions, IAuthOptions {
}

export interface ILoginInputs {
	username: string;
	password: string;
}

export interface ITokenObject {
	username: string;
	email: string;
}

export interface ILoginnResponse {
	tokekn: string;
	message?: string;
}
