import Hapi = require("hapi");
import Config from "../sami.config";
import { IRouter } from "./config";
import Controller from "./controller";
import { IHandler, RequestType } from "./controller";

export default class Server {

    private server: Hapi.Server;

    public constructor(portNumber: number) {
        this.server = new Hapi.Server({
            host: "localhost",
            port: Number(portNumber || process.env.port || 3000)
        });
    }

    public async start(): Promise<void> {
		this.handleRouters("", Config.routers);

		await this.server.start();
		console.log(`started on ${this.server.settings.port}`);
	}

	private handleRouters(prefix: string, router: IRouter[]): void {
		for(let item of router) {
			if(item.route instanceof Array) {
				this.handleRouters(prefix + item.prefix, item.route as IRouter[]);
			} else {
				this.assignRoute(prefix + item.prefix, item.route as string);
			}
		}
	}

	private assignRoute(prefix: string, path: string): void {
		var controller = require(`.${path}`);
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