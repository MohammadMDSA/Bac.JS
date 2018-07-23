// import Server from "./src/server/server";
import Server from "./src/server/server";
import config from "./bac.config";

const server: Server = new Server(config);

async function a() {
    await server.start();
   
}

a()
