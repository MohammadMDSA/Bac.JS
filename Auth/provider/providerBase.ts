import { ValidationResult } from "hapi-auth-jwt2";
import { Request, ResponseToolkit } from "hapi";

export default abstract class ProviderBase<T extends IProviderOptions> {

	protected _options: T;

	constructor(options: T) {
		this._options = options;
	}

	public abstract authenticateToken(token: string): ValidationResult;

	public abstract validateToken(token: string, secret: string): Promise<object | string>;

	public abstract verify(decoded: any, request: Request, tk?: ResponseToolkit): ValidationResult | Promise<ValidationResult>;
}

export interface IProviderOptions {
}
