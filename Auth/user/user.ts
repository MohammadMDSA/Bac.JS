import DBModel from "../../MongoDB/Model";
import { SchemaDefinition, Document, Model } from "mongoose";
import Session from "./session";

export class UserModel extends DBModel {

    protected static $visible(): string[] {
        return ["username", "email", "sessions"];
    }

    public static get collectionName(): string {
        return "user";
    }

    protected static $schema(): SchemaDefinition {

        return {
            username: { type: String, index: true, sparse: true, unique: true },
            email: { type: String, index: true, sparse: true, unique: true },
            password: { type: String },
            sessions: [
                {
                    createdAt: { type: Date, default: Date.now() },
                    ip: { type: String }
                }
            ]
        };

    }
}

let mode: Model<IUserModelDocument>;

export default mode = UserModel.$model<IUserModelDocument>();

export interface IUserModelDocument extends Document {
    password: string;
    username: string;
    email: string;
    sessions: Session[];
}
