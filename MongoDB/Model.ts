import {Schema, model, SchemaDefinition, Model, Document} from "mongoose";

export default abstract class DBModel {
	
	private static $schema(): SchemaDefinition { return null; }

	public static get $model(): Model<Document> {
		const schema: Schema = new Schema(this.$schema());
		return model(this.constructor.name, schema);
	}

}
