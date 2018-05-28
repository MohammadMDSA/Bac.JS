import Controller from "../server/controller";
import { RequestType } from "../server/controller";
import TestModel from "../models";

export default class Test extends Controller {

    public init(): void {
        this.assign([RequestType.GET, RequestType.POST], async (req, h) => {
            let e = new TestModel({Name: "hey", foo: 13, Username: false});
            await e.save();
            return e;
        });

        this.assign([RequestType.DELETE], (request, h) => {
            return {o: "SomeObject"};
        });
    }

}
