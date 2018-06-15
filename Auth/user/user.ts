import DBModel from "../../MongoDB/Model";
import { SchemaDefinition, Document } from "mongoose";
import Session from "./session";

export class UserModel extends DBModel {

    protected static $visible(): string[] {
        return ["username", "email", "sessions"];
    }

    protected static $schema(): SchemaDefinition {

        return {
            username: { type: String, index: true, sparse: true, unique: true },
            email: { type: String, index: true, sparse: true, unique: true },
            password: { type: String },
            sessions: [
                {
                    createdAt: { type: Date, default: Date.now() },
                    ip: {type: String}
                }
            ]
        };

    }
}

export default UserModel.$model<IUserModelDocument>();

export interface IUserModelDocument extends Document {
    password: string;
    username: string;
    email: string;
    sessions: Session[];
}
