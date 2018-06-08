import UserModel from "./user";
import { Document, Model } from "mongoose";

export default abstract class BaseProvider {
    protected _options: IOptions;

    constructor(options: IOptions) {
        this._options = options;
        if (!this._options.userModel) {
            this._options.userModel = require("./user");
        }
    }

    public abstract async authToken(token: string);

    public abstract async getToken(user, request, client): string;

    public abstract findByUsername(username: string);

    public abstract validateUser(user);

    public abstract validatePassword(user, password);
}

export interface IOptions {
    userModel?: Model<Document>;
    secret: string;
    auto_logout?: boolean;
    max_sessions?: {
        has_limit: boolean, limit: number
    };
}
