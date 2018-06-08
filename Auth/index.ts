import * as JWT from "hapi-auth-jwt2";
import Plugin, { IPluginOptions } from "../server/pluginBase";
import { Server } from "hapi";
import Provider from "./provider/provider";

export default class AuthPlugin extends Plugin<IAuthOptions> {
	constructor(server: Server, options: IAuthOptions) {
		super(server, options);
	}

	public async register(): Promise<void> {
		console.log("IN auth")
		await this._server.register(JWT);

		let provider = new Provider({secret: "secret"});

		let authOptions: JWT.Options = {
			key: this._options.secret,
			validate: provider.verify,
			verifyOptions: { algorithms: ["HS256"] }
		};

		this._server.auth.strategy("jwt", "jwt", authOptions);
		this._server.auth.default("jwt");

		console.log("finished auth");
	}
}

export interface IAuthOptions extends IPluginOptions {
	secret: string;
}
