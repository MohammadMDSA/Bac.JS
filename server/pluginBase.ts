import { Server } from "hapi";

export default abstract class Plugin<T extends IPluginOptions> {
	protected _options: T;
	protected _server: Server;

	constructor(server: Server, options: T) {
		this._options = options;
		this._server = server;
	}

	public abstract async register(): Promise<void>;
}

export interface IPluginOptions {
}
