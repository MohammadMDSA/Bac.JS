import DBModel from "../MongoDB/Model";
import { SchemaDefinition } from "mongoose";

class User extends DBModel {
    protected static $schema(): SchemaDefinition {

        return {
            username: { type: String, index: true, sparse: true, unique: true },
            email: { type: String, index: true, sparse: true, unique: true },
            password: { type: String },
            sessions: [
                {
                    _ip: { type: String },
                    created_at: { type: Date, default: Date.now }
                }
            ]
        };

    }
}

export default User.$model();
