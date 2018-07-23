import IConfig from "./src/server/config";
import {Request, ResponseToolkit} from "hapi";

let appConfig: IConfig;

export default appConfig = {
    routers: [
        {
            method: "GET",
            handler: (r, h) => "Hello world",
            path: "/api"
        },
        {prefix: "/api", route: "./controllers/test"},
        {prefix: "/1", route: [
            {prefix: "/2", route: "./controllers/test.1"}
        ]},
    ],

    port: 5500,

    mongo: {
        connection: "mongodb://localhost/test"
    },

    auth: {
        secret: "My secret",
        session: {
            limited: true,
            limitation: 4,
            expiredAfter: Date.UTC(0, 1, 0, 0, 0, 0) - Date.UTC(0, 0, 0, 0, 0, 0)
        }
    },
    
    typeScript: {
        outDir: "///lib/"
    }
};
