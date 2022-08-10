import fastify from "fastify";
import { Server } from "./server/server";
import * as usersModule from "./modules/usersModule/routers";
import * as animeModule from "./modules/animeModule/routers";

const server = new Server(fastify({ logger: true }));


server.registerRouter(usersModule);
server.registerRouter(animeModule);
//server.registerPlugin(onAuth);

server.registerApi();


export default server;