import { Request } from "hapi";

export default class Controller {
    private handlers: IHandler[];

    public assign(method: RequestType[], handler: (request, handler) => void) {
        this.handlers.push({method: method, handler: handler});
    }

    public getHandlers(): IHandler[] {
        return this.handlers;
    }
}

export declare enum RequestType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    COPY = "COPY",
    HEAD = "HEAD",
    OPTION = "OPTION",
    LINK = "LINK",
    UNLINK = "UNLINK",
    PURGE = "PURGE",
    LOCK = "LOCK",
    UNLOCK = "UNLOCK",
    PROPFIND = "PROPFIND",
    VIEW = "VIEW"
}

export interface IHandler {
    method: RequestType[],
    handler: (request, handler) => void;
}