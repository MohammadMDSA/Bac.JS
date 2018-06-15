import { Schema, model, SchemaDefinition, Model, Document } from "mongoose";
import * as _ from "lodash";

export default abstract class DBModel {

	protected static $visible(): string[] { return null; }

	protected static $hidden(): string[] { return null; }

	protected static $schema(): SchemaDefinition { return null; }

	public static $model<T extends Document>(): Model<T> {
		const schema: Schema = new Schema(this.$schema());

		return model(this.prototype.constructor.name, schema);
	}

	public static transform<T extends Document>(document: T): Partial<T> {

		let result: Partial<T> = document;

		console.log(this.$visible());

		if (this.$visible()) {
			result = _.pickBy<T>(document, (value, key) => this.$visible().indexOf(key) !== -1);
		}
		else if (this.$hidden()) {
			result = _.omitBy<T>(document, (value, key) => this.$hidden().indexOf(key) !== -1);
		}
		return result;
	}

}
