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
            port: Number(process.env.port || 3000)
        });
    }

    public async start(): Promise<void> {
		this.handleRouters("", Config.routers);

		await this.server.start();
	}

	// private handleRouters(prefix: String, routers: IRouter[]): void {
	// 	for(let item of routers) {
	// 		this.handleRouter(prefix + item.prefix, item.route)
	// 	}
	// }

	private handleRouters(prefix: string, router: IRouter[]): void {
		for(let item of router) {
			if(item.route instanceof String) {
				this.assignRoute(prefix + item.prefix, item.route as string);
			} else {
				this.handleRouters(prefix + item.prefix, item.route as IRouter[]);
			}
		}
	}

	private assignRoute(prefix: string, path: string): void {
		let controller: Controller = require("." + path);
		let handlers: IHandler[] = controller.getHandlers();
		for(let handle of handlers) {
			this.server.route({
				method: handle.method,
				handler: handle.handler,
				path: prefix
			});
		}
	}

}