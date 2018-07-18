import { ConnectionOptions } from "mongoose";
import { ServerRoute } from "hapi";

export default interface IConfig {
    routers: Array<IRouter | ServerRoute>;

    port?: number;

    mongo?: IMongoConfig;

    auth?: IAuth;
}

export interface IRouter {
    prefix: string;
    route: IRouter[] | string;
}

export interface IMongoConfig {
    connection: string;
    options?: ConnectionOptions;
}

export interface IAuth {
    secret: string;
    session?: {
        limited: boolean;
        limitation?: number;
        expiredAfter?: number
    };
}
