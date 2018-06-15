import { Schema, model, SchemaDefinition, Model, Document } from "mongoose";
import * as _ from "lodash";

export default abstract class DBModel {

	protected static $visible(): string[] { return null; }

	protected static $hidden(): string[] { return null; }

	protected static $schema(): SchemaDefinition { return null; }

	public static get collectionName(): string { return null; }

	public static $model<T extends Document>(): Model<T> {
		const schema: Schema = new Schema(this.$schema());

		if (this.collectionName) {
			return model(this.collectionName, schema);
		}
		else {
			return model(this.prototype.constructor.name, schema);
		}

	}

	public static transform<T extends Document>(document: T): Partial<T> {

		if (this.$visible()) {
			console.log(this.$visible());
			return _.pickBy<T>(document, (value, key) => this.$visible().indexOf(key) !== -1);
		}
		else if (this.$hidden()) {
			console.log(this.$hidden());
			return _.omitBy<T>(document, (value, key) => this.$hidden().indexOf(key) !== -1);
		}
		return document;
	}

}
