export default interface IConfig {
    routers: IRouter;
}

interface IRouter {
    prefix: String;
    route: IRouter | String;
}