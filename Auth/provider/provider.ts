import ProviderBase, { IProviderOptions } from "./providerBase";
import { Request, ResponseToolkit } from "hapi";
import { ValidationResult } from "hapi-auth-jwt2";

export default class Provider extends ProviderBase<IDefaultProviderOptions> {

	constructor(options: IDefaultProviderOptions) {
		super(options);
	}

	public authenticateToken(token: string): ValidationResult {
		return null;
	}

	public validateToken(token: string, secret: string): Promise<object | string> {
		return null;
	}

	public verify(decoded: any, request: Request, tk?: ResponseToolkit): ValidationResult | Promise<ValidationResult> {
		console.log("Validating");
		if (decoded.id === 1) {
			return {
				isValid: true,
				credentials: null
			};
		} else {
			return {
				isValid: false,
				credentials: null
			};
		}
	}
}

export interface IDefaultProviderOptions extends IProviderOptions {
	secret: string;
}
