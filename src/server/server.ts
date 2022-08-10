import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { IncomingMessage, Server as httpServer, ServerResponse } from "http";
import { plugin, pluginSet, router, routerSet } from "./serverTypes";
//import { initLocalDatabasesIfNotExists } from "../dataSources/initLocalDatabases";
import { RouteOptions } from "@fastify/websocket";
import {fastifyRequestContextPlugin} from "@fastify/request-context";
import {logger} from "../logger/winlog";

export class Server {
  private setOfRouters: routerSet;
  private setOfPlugins: pluginSet;
  private serverInstance: FastifyInstance<httpServer,
    IncomingMessage,
    ServerResponse>;

  constructor(
    server: FastifyInstance<httpServer, IncomingMessage, ServerResponse>,
    routerSet?: routerSet,
    pluginSet?: pluginSet
  ) {
    this.setOfRouters = routerSet ?? [];
    this.setOfPlugins = pluginSet ?? [];
    this.serverInstance = server;
    server.register(fastifyRequestContextPlugin);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    server.register(require('@fastify/cookie'),{
      secret: process.env.COOKIE_SECRET
    });
  }


  public registerRouter(router: router):void {
    this.setOfRouters.push(router);
  }
  public registerPlugin(plugin: plugin):void {
    this.setOfPlugins.push(plugin);
  }

  private registerPlugins() {
    this.setOfPlugins.forEach((plugin: plugin) => {
      this.serverInstance.register(plugin.pluginInstance, plugin.options);
    });
  }

  private registerRouters() {
    this.setOfRouters.forEach((router: router) => {
      const { routes, opts } = router;
      const plugin = (
        server: FastifyInstance,
        opts: FastifyPluginOptions,
        done: () => unknown
      ) => {
        routes.forEach((route: RouteOptions) => server.route(route));
        done();
      };
      this.serverInstance.register(plugin, opts);
    });
  }

  public registerApi():void {
    this.registerPlugins();
    this.registerRouters();
  }

  // public async initLocalDatabases() {
  //   await initLocalDatabasesIfNotExists();
  // }

  public async initServer(port: number, host: string):Promise<void> {
    await this.serverInstance.listen({ port: port, host: host }, (err) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }
    });
  }
}