import ProviderBase, { IProviderOptions } from "./providerBase";
import { Request, ResponseToolkit } from "hapi";
import { ValidationResult } from "hapi-auth-jwt2";
import { jwtDecode, jwtSign } from "../provider/utils";
import { DecodeOptions } from "jsonwebtoken";
import User, { IUserModelDocument } from "../user/user";
import { isEmailValid, isPasswordValid, isUsernameValid } from "../provider/validation";
import * as Boom from "boom";
import { IAuthOptions } from "..";
import * as _ from "lodash";
import Session, { ISession } from "../user/session";

export default class Provider extends ProviderBase<IDefaultProviderOptions> {

	private static _provider;

	constructor(options: IDefaultProviderOptions) {
		super(options);
		Provider._provider = this;
	}

	static get provider(): Provider {
		return Provider._provider;
	}

	public authenticateToken(token: string, options?: DecodeOptions): ValidationResult {

		return null;
	}

	public async signUp(_username: string = "", _password: string = "", _email: string = ""): Promise<IUserModelDocument> {

		let email = String(_email);
		let password = String(_password);
		let username = String(_username);

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

	public async login({ username, password, request }: ILoginInputs): Promise<ILoginResponse> {

		let user = await this.findByUsername(username);

		if (!user) {
			throw Boom.unauthorized("Invalid username or password");
		}

		if (user.password !== password) {
			throw Boom.unauthorized("Invalid username or password");
		}

		for (let i = 0; i < user.sessions.length; i++) {
			if (Session.isExpired(this._options.session.expiredAfter, user.sessions[i])) {
				user.sessions.splice(i, 1);
			}
		}

		for (let ses of user.sessions) {
			if (ses.ip === request.info.remoteAddress) {

				user.save();

				let tok = jwtSign({
					email: user.email,
					username: user.username,
					session: ses
				}, this._options.secret);

				return {
					tokekn: tok
				};
			}
		}

		let session: Session = new Session(Date.now(), request.info.remoteAddress);

		user.sessions.push(session);

		if (this._options.session.limited && user.sessions.length >= this._options.session.limitaion) {
			user.sessions = _.sortBy(user.sessions, ["createdAt"]).reverse().slice(0, this._options.session.limitaion);
		}

		user.save();

		let token = jwtSign({
			email: user.email,
			username: user.username,
			session: {
				createdAt: session.createdAt,
				ip: session.ip
			}
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

	public verify(decoded: ITokenObject, request: Request, tk?: ResponseToolkit): ValidationResult | Promise<ValidationResult> {

		if (Session.isExpired(Provider.provider._options.session.expiredAfter, decoded.session)) {
			return {
				isValid: false,
			};
		}

		return {
			isValid: true
		};
	}

}

export interface IDefaultProviderOptions extends IProviderOptions, IAuthOptions {
}

export interface ILoginInputs {
	username: string;
	password: string;
	request: Request;
}

export interface ITokenObject {
	username: string;
	email: string;
	session: Session;
}

export interface ILoginResponse {
	tokekn: string;
	message?: string;
}
