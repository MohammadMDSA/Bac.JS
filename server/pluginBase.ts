import Server from "./server";

export default abstract class Plugin {
	private _options: IPluginOptions;
	private _server: Server;

	constructor(server: Server, options: IPluginOptions) {
		this._options = options;
		this._server = server;
	}

	public abstract async register(): Promise<void>;
}

export interface IPluginOptions {
}
