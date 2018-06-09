import * as JWT from "hapi-auth-jwt2";
import { Server, ServerRegisterPluginObject } from "hapi";
import Provider from "./provider/provider";
import Plugin, { IPluginOptions } from "../server/pluginBase";
import * as Hapi from "hapi";

export default class AuthPlugin extends Plugin<IAuthOptions> {
	constructor(server: Server, options: IAuthOptions) {
		super(server, options);
	}

	public async register(): Promise<void> {
		await this._server.register(JWT);

		let provider = new Provider({secret: this._options.secret});

		let authOptions: JWT.Options = {
			key: this._options.secret,
			validate: provider.verify,
			verifyOptions: { algorithms: ["HS256"] }
		};

		this._server.auth.strategy("jwt", "jwt", authOptions);
		this._server.auth.default("jwt");
	}
}

export interface IAuthOptions extends IPluginOptions {
	secret: string;
}
