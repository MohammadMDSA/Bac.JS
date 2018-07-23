import Server from "./server/server";
import IConfig, {IRouter, IAuth, IMongoConfig, ITypeScript} from "./server/config";
import Controller, {AnyRequestType, IControllerOptions, IHandler, RequestType} from "./server/controller";
import DBModel from "./MongoDB/Model";

export {
    // Server file
    Server,

    // Config file
    IRouter,
    IAuth,
    IMongoConfig,
    IConfig,

    // Controller file
    Controller,
    AnyRequestType,
    IControllerOptions,
    IHandler,
    RequestType,

    // Model
    DBModel,

};
