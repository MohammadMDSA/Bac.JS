import DBModel from "../../MongoDB/Model";
import { SchemaDefinition, Document } from "mongoose";
import Session from "./session";

class User extends DBModel {
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

export default User.$model<IUserModelDocument>();

export interface IUserModelDocument extends Document {
    username: string;
    password: string;
    email: string;
    sessions: Session[];
}
