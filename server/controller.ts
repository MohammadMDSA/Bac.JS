import { Request, ResponseToolkit, RouteOptions } from "hapi";

export default abstract class Controller {
    private _handlers: IHandler[];
    protected _prefix: string;
    protected _options: IControllerOptions;

    constructor(options?: IControllerOptions) {
        this._handlers = [];
        this._prefix = "";
        this._options = options;

        if (options && !this._options.manualInit) {
            this.init();
        }
    }

    protected assign(prefix: string, method: RequestType[] | AnyRequestType, handler: (request: Request, h: ResponseToolkit, err?: Error) => any | Promise<any>, options?: RouteOptions): void {
        if (Array.isArray(method)) {
            this._handlers.push({ prefix: prefix, method: (method as RequestType[]), handler: handler, options: options });
        }
        else {
            let allMethods: RequestType[] = [];

            for (let item in RequestType) {
                allMethods.push(RequestType[item] as RequestType);
            }
            this._handlers.push({ prefix: prefix, method: allMethods, handler: handler, options: options });
        }

    }

    get handlers(): IHandler[] {
        return this._handlers;
    }

    get prefix(): string {
        return this._prefix;
    }

    set prefix(value: string) {
        this._prefix = value;
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
    prefix: string;
}

export interface IControllerOptions {
    manualInit?: boolean;
}