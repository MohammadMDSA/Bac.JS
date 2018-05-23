export default interface Config {
    routers: Router
}

interface Router {
    prefix: String,
    route: Router | String
}