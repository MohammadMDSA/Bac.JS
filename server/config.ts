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

interface IMongoConfig {
    connection: string;
    options?: ConnectionOptions;
}

interface IAuth {
    secret: string;
    max_sessions?: {
        limited: boolean;
        limitation?: number;
    };
}
