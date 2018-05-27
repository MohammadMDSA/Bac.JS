import IConfig from "./server/config";

let appConfig: IConfig;

export default appConfig = {
    routers: [
        {prefix: "/api", route: "./controllers/test"},
        {prefix: "/1", route: [
            {prefix: "/2", route: "./controllers/test.11"}
        ]}
    ]
};
