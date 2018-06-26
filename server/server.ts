import Hapi = require("hapi");
import Colors = require("colors");
import Controller from "./controller";
import IConfig from "./config";
import { IRouter } from "./config";
import { IHandler, RequestType } from "./controller";
import { connect } from "mongoose";
import AuthPlugin from "../Auth";
import * as RootPath from "app-root-path";

export default class Server {

	private server: Hapi.Server;
	private _config: IConfig;

	public constructor(config: IConfig) {
		this._config = config;

		this.server = new Hapi.Server({
			host: "localhost",
			port: Number(this._config.port || process.env.port || 3000)
		});

		RootPath.setPath(RootPath.path + "/out");
	}

	public async start(): Promise<void> {
		await this.setupAuth();

		await this.handleRouters("", this._config.routers);

		await this.connectMongo();

		try {
			await this.server.start();
			console.log(Colors.green(`Started on ${this.server.settings.port}`));
		} catch (error) {
			console.log(Colors.red(`Failed to connect to port ${this.server.settings.port}`));
		}
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

		let modulePath = RootPath.resolve(path);

		try {
			const controller = await import(modulePath);
			let cont: Controller = new controller.default();

			let handlers: IHandler[] = cont.handlers;

			let prser: string[] = modulePath.split(/[\\\/]/);

			for (let handle of handlers) {

				this.server.route({
					method: handle.method,
					handler: handle.handler,
					path: prefix + "/" + prser[prser.length - 1] + cont.prefix + handle.prefix,
					options: handle.options
				});
				for (let method of handle.method) {

					console.log(Colors.yellow(`${prefix + "/" + prser[prser.length - 1] + cont.prefix + handle.prefix}`) + Colors.green(`\t\t[${method}]`));
				}
			}
			console.log();
		} catch (error) {
			console.log("Could not assign route with prefix: ".red + prefix.green + " from ".red + ("." + modulePath).green);
		}
	}

	public async assignHandlers(handlers: IHandler[], prefix: string) {
		for (let handle of handlers) {
			try {
				this.server.route({
					method: handle.method,
					handler: handle.handler,
					path: prefix + handle.prefix,
					options: handle.options
				});
				for (let method of handle.method) {

					console.log(Colors.yellow(`${prefix + handle.prefix}`) + Colors.green(`\t\t[${method}]`));
				}
			} catch (error) {
				console.log("Could not assign route with prefix: ".red + (prefix + handle.prefix).green);
			}
		}
		console.log();
	}

	public async assignServerRoute(route: Hapi.ServerRoute) {
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
			if (!this._config.auth) {
				return;
			}

			let sessionLimitaion = this._config.auth.session;

			if (!sessionLimitaion) {
				sessionLimitaion = {
					limited: false
				};
			}

			let a = new AuthPlugin(this, {
				secret: this._config.auth.secret,
				session: {
					limitaion: sessionLimitaion.limitation,
					limited: sessionLimitaion.limited,
					expiredAfter: sessionLimitaion.expiredAfter
				}
			});

			await a.register();

		} catch (e) {
			console.log(Colors.red("Failed to setup Authentication for server"));
		}
	}

	get coreServer(): Hapi.Server {
		return this.server;
	}

}
