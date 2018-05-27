export default interface IConfig {
    routers: IRouter[];

    port?: number;
}

export interface IRouter {
    prefix: string;
    route: IRouter[] | string;
}
