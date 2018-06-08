import Controller from "../server/controller";
import { Request, ResponseToolkit } from "hapi";
import Provider from "./provider/provider";

export default class Auth extends Controller {

    private _provider: Provider;

    constructor(provider: Provider) {
        super();
        this._provider = provider;
    }

    public init(): void {

    }

    private async login(request: Request, h: ResponseToolkit) {
    
    }

    private async logout(request: Request, h: ResponseToolkit) {

    }

    private async user(request: Request, h: ResponseToolkit) {

    }
}
