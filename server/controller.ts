import { Request, ResponseToolkit, RouteOptions } from "hapi";

export default abstract class Controller {
    private _handlers: IHandler[];

    constructor() {
        this._handlers = [];
    }

    protected assign(method: RequestType[] | AnyRequestType, handler: (request: Request, h: ResponseToolkit, err?: Error ) => void): void {
        if (Array.isArray(method)) {
            this._handlers.push({method: (method as RequestType[]), handler: handler});
        }
        else {
            let allMethods: RequestType[] = [];

            for (let item in RequestType) {
                allMethods.push(RequestType[item] as RequestType);
            }
            console.log(allMethods);

            this._handlers.push({method: allMethods, handler: handler});
        }

    }

    get handlers(): IHandler[] {
        return this._handlers;
    }

    public abstract init(): void;
}

export enum RequestType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    OPTION = "OPTION"
}

export enum AnyRequestType {
    Any = "Any"
}

export interface IHandler {
    method: RequestType[];
    handler: (request: Request, h: ResponseToolkit) => void;
    options?: RouteOptions;
}
