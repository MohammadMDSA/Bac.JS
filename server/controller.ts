import { Request } from "hapi";

export default abstract class Controller {
    _handlers: IHandler[];

    constructor() {
        this._handlers = [];
    }

    protected assign(method: RequestType[], handler: (request, handler) => void) {
        this._handlers.push({method: method, handler: handler});
    }

    get handlers(): IHandler[] {
        return this._handlers;
    }

    abstract init(): void;
}

export enum RequestType {
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
    method: RequestType[];
    handler: (request, handler) => void;
}