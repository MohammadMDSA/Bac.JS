export default class Session implements ISession {

    public createdAt: number;
    public ip: string;

    constructor(createdAt: number, ip: string) {
        this.createdAt = createdAt;
        this.ip = ip;
    }

    public static isExpired(timeout: number, session: Session): boolean {

        if (!timeout) {
            return false;
        }

        return !(Date.now() - session.createdAt < timeout);
    }

}

export interface ISession {
    createdAt: number;
    ip: string;
}
