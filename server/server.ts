import Hapi = require("hapi");
import Colors =  require("colors");
import * as JWT2 from "hapi-auth-jwt2";
import Controller from "./controller";
import IConfig from "./config";
import { IRouter } from "./config";
import { IHandler, RequestType } from "./controller";
import { promises } from "fs";
import { connect } from "mongoose";


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

		await this.connectMongo();

		await this.setupAuth();

		await this.server.start();
		console.log(Colors.green(`started on ${this.server.settings.port}`));
	}

	private async handleRouters(prefix: string, router: Array<IRouter | Hapi.ServerRoute>): Promise<void> {
		for (let item of router) {
			if (!(item as IRouter).prefix) {
				this.assignServerRoute(item as Hapi.ServerRoute);
				return;
			}
			if (Array.isArray((item as IRouter).route)) {
				this.handleRouters(prefix + (item as IRouter).prefix, (item as IRouter).route as IRouter[]);
			} else {
				await this.assignRoute(prefix + (item as IRouter).prefix, (item as IRouter).route as string);
			}
		}
	}

	private async assignRoute(prefix: string, path: string): Promise<void> {
		try {
			const controller = await import(`.${path}`);
			let cont: Controller = new controller.default();
	
			let handlers: IHandler[] = cont.handlers;
	
			let prser: string[] = path.split("/");
	
			for (let handle of handlers) {
				this.server.route({
					method: handle.method,
					handler: handle.handler,
					path: prefix + cont.prefix + "/" + prser[prser.length - 1],
					options: handle.options
				});
				for (let method of handle.method) {

					console.log(Colors.yellow(`${prefix + "/" + prser[prser.length - 1]}`) + Colors.green(`\t\t[${method}]`));
				}
			}
			console.log();
		} catch (error) {
			console.log("Could not assign route with prefix: ".red + prefix.green + " from ".red + ("." + path).green);
		}
	}

	private async assignServerRoute(route: Hapi.ServerRoute) {
		try {
			this.server.route(route);
		} catch (error) {
			console.log(Colors.red("Failed to assign route" + route.path));
		}
	}

	private async connectMongo(): Promise<void> {
		try {
			if (!this._config.mongo) {
				return;
			}
	
			await connect(this._config.mongo.connection, this._config.mongo.options);
		} catch (e) {
			console.log(Colors.red(`Failed to connect to Mongo server of ${this._config.mongo.connection}`));
		}
	}

	private async setupAuth(): Promise<void> {
		try {
			if(!this._config.auth) {
				return;
			}

			await this.server.register(JWT2);

			this.server.auth.strategy("jwt", "jwt", {
				
			});


		} catch(e) {
			console.log(Colors.red("Failed to setup Authentication for server"));
		}
	}

}
