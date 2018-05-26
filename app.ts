import Server from "./server/server";
import config from "./sami.config";

const server: Server = new Server(config);

server.start();