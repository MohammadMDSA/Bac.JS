import Controller, { RequestType, AnyRequestType } from "../server/controller";
import { Request, ResponseToolkit } from "hapi";
import Provider from "./provider/provider";

export default class Auth extends Controller {

    _provider: Provider;

    constructor(provider: Provider) {
        super({ manualInit: true });
        this._provider = provider;
        this.init();
    }

    public init(): void {
        this._prefix = "/auth";

        const signUp = async (request: Request, h: ResponseToolkit) => {
            let {username, password, email} = request.payload as any;
            return await this._provider.signUp(username, password, email);
        };

        const login = async (request: Request, h: ResponseToolkit) => {
            
        };

        const logout = async (request: Request, h: ResponseToolkit) => {

        };

        const user = async (request: Request, h: ResponseToolkit) => {

        };

        this.assign("/login", [RequestType.POST], login, {auth: false});
        this.assign("/logout", AnyRequestType.Any, logout, {auth: "jwt"});
        this.assign("/user", [RequestType.GET], user, {auth: false});
        this.assign("/signup", [RequestType.POST], signUp, {auth: false});
    }

}
