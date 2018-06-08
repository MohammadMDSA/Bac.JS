import BaseProvider, { IOptions } from "./baseProvider";
import * as Boom from "boom";
import * as Utils from "./utils";
import { Request } from "hapi";
import * as _ from "lodash";

class AuthProvider extends BaseProvider {

    constructor(options: IOptions) {
        super(options);
    }

    public async authToken(token: string) {
        let token_decoded: any = Utils.jwtDecode(token);
        if (!token_decoded) {
            throw new Error("INVALID_TOKEN");
        }

        let userId = token_decoded.id;
        let sessionId = token_decoded.session;

        let user: any = await this._options.userModel.findById(userId);

        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        let session = user.sessions.id(sessionId);
        if (!session) {
            throw new Error("SESSION_EXPIRED");
        }

        let validated = await this.validateToken(token);
        if (!validated) {
            throw new Error("INVALID_TOKEN");
        }

        return {
            credentials: { user, scope: user.scope },
            artifacts: session
        };
    }

    private async validateToken(token: string): Promise<string | object> {
        return Utils.jwtVerify(token, this._options.secret);
    }

    public async getToken(user, request, client): string {
        let session = user.session.create({
            agent: request.headers["user-agent"],
            ip: Utils.getIP(request)
        });

        if (this._options.auto_logout === true) {
            user.sessions = user.sessions.filter(s => (s.agent !== session.agent || s.ip !== session.ip));
        }

        let { max_sessions } = this._options;
        if (max_sessions && !max_sessions.has_limit) {
            max_sessions.limit = max_sessions.limit || 3;
            user.sessions = _.sortBy(user.session, ["created_at", "_id"]).reverse().slice(0, max_sessions.limit - 1)
        }
        
        user.sessions.unshift(session);
        await user.save;

        let secret = this._options.secret;
        let token = await Utils.jwtSign({ user: user._id, session: session._id }, secret);

        return null;
    }

    public findByUsername(username: string) {

    }
    
    public validateUser(user) {

    }

    public validatePassword(user, password) {

    }
}
