import Controller from "../server/controller";
import { RequestType } from "../server/controller";

export default class Test extends Controller {

    public init(): void {
        this.assign([RequestType.GET], (req, h) => {
            return "Hello world";
        });
    }

}
