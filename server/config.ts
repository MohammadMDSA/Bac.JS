import { ConnectionOptions } from "mongoose";

export default interface IConfig {
    routers: IRouter[];

    port?: number;

    mongo?: IMongoConfig;
}

export interface IRouter {
    prefix: string;
    route: IRouter[] | string;
}

interface IMongoConfig {
    connection: string;
    options?: ConnectionOptions;
}
