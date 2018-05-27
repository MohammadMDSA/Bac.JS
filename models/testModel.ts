import DBModel from "../MongoDB/Model";
import { SchemaDefinition } from "mongoose";

class Test extends DBModel {
    protected static $schema(): SchemaDefinition {
        return {
            Name: String
        };
    }
}

export default Test.$model;
