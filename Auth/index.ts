import * as JWT from "hapi-auth-jwt2";
import Provider from "./provider/provider";
import Plugin, { IPluginOptions } from "../server/pluginBase";
import Auth from "./AuthController";
import Server from "../server/server";

export default class AuthPlugin extends Plugin<IAuthOptions> {

	private _provider: Provider;

	constructor(server: Server, options: IAuthOptions) {
		super(server, options);
		this._provider = new Provider(options);
	}

	public async register(): Promise<void> {
		await this._server.CoreServer.register(JWT);

		let authOptions: JWT.Options = {
			key: this._options.secret,
			validate: this._provider.verify,
			verifyOptions: { algorithms: ["HS256"] }
		};

		this._server.CoreServer.auth.strategy("jwt", "jwt", authOptions);
		this._server.CoreServer.auth.default("jwt");

		let authController = new Auth(this._provider);
		this._server.assignHandlers(authController.handlers, authController.prefix);
	}
}

export interface IAuthOptions extends IPluginOptions {
	secret: string;
	session: {
		limited: boolean,
		limitaion?: number;
		expiredAfter?: number
	};
}
