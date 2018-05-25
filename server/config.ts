export default interface IConfig {
    routers: IRouter[];
}

export interface IRouter {
    prefix: string;
    route: IRouter[] | string;
}