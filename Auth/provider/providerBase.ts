import { ValidationResult } from "hapi-auth-jwt2";

export default abstract class ProviderBase<T extends IProviderOptions> {

	protected _options: T;

	constructor(options: T) {
		this._options = options;
	}

	public abstract authenticateToken(token: string): ValidationResult;
}

export interface IProviderOptions {
}
