import Controller from "../server/controller";
import { Request, ResponseToolkit } from "hapi";

export default abstract class Auth extends Controller {
    public init(): void {

    }

    private async login(request: Request, h: ResponseToolkit) {
    
    }

    private async logout(request: Request, h: ResponseToolkit) {

    }

    private async user(request: Request, h: ResponseToolkit) {

    }

    private async oauthLogin(request: Request, h: ResponseToolkit) {

    }

    private async oauthAuthorize(request: Request, h: ResponseToolkit) {
        
    }
}
