import DBModel from "../MongoDB/Model";
import { SchemaDefinition } from "mongoose";
import { TextDecoder } from "util";

class Test extends DBModel {
    protected static $schema(): SchemaDefinition {
        return {
            Name: String
        };
    }
}

export default Test.$model();
