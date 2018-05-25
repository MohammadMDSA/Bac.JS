import Config from './server/config';

let appConfig : Config;

export default appConfig = {
    routers: {
        prefix: '/api',
        route: './controller'
    }
}