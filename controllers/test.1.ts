import Controller from "../src/server/controller";
import { RequestType } from "../src/server/controller";

export default class Test extends Controller {

    public init(): void {
        this.assign("", [RequestType.GET], (req, h) => {
            return "Hello world";
        });
    }

}
