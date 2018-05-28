import {Schema, model, SchemaDefinition, Model, Document} from "mongoose";

export default abstract class DBModel {

	protected static $schema(): SchemaDefinition { return null; }

	public static $model(): Model<Document> {
		const schema: Schema = new Schema(this.$schema());

		return model(this.prototype.constructor.name, schema);
	}

}
