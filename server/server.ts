import Hapi = require("hapi");
import { IRouter } from "./config";
import Controller from "./controller";
import { IHandler, RequestType } from "./controller";
import IConfig from "./config";
import { promises } from "fs";

export default class Server {

	private server: Hapi.Server;
	private _config: IConfig;

    public constructor(config: IConfig) {
		this._config = config;

        this.server = new Hapi.Server({
            host: "localhost",
            port: Number(this._config.port || process.env.port || 3000)
        });
    }

    public async start(): Promise<void> {
		await this.handleRouters("", this._config.routers);

		await this.server.start();
		console.log(`started on ${this.server.settings.port}`);
	}

	private async handleRouters(prefix: string, router: IRouter[]): Promise<void> {
		for(let item of router) {
			if(item.route instanceof Array) {
				this.handleRouters(prefix + item.prefix, item.route as IRouter[]);
			} else {
				await this.assignRoute(prefix + item.prefix, item.route as string);
			}
		}
	}

	private async assignRoute(prefix: string, path: string): Promise<void> {
		const controller = await import(`.${path}`);
		let cont: Controller = new controller.default();

		cont.init();

		let handlers: IHandler[] = cont.handlers;

		let prser: string[] = path.split("/");

		for(let handle of handlers) {
			this.server.route({
				method: handle.method,
				handler: handle.handler,
				path: prefix + "/" + prser[prser.length - 1]
			});
			for(let method of handle.method) {
				console.log(`${prefix + "/" + prser[prser.length - 1]}\t\t[${method}]`);
			}
		}
		console.log();
	}

}