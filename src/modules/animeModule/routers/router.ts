import { RouteOptions } from "@fastify/websocket";
import { RegisterOptions, RouteHandler } from "fastify";
import * as controller from "./controller";

export const opts: RegisterOptions = {
  prefix: "/anime"
};

export const routes: RouteOptions[] = [
  {
    method: "POST",
    url: "/createAnime",
    handler: <RouteHandler>controller.createAnime
  },
  {
    method: "GET",
    url: "/:id",
    handler: <RouteHandler>controller.readAnime
  },
  {
    method: "PUT",
    url: "/updateAnime",
    handler: <RouteHandler>controller.updateAnime
  },
  {
    method: "DELETE",
    url: "/:id",
    handler: <RouteHandler>controller.deleteAnime
  },
  {
    method: "GET",
    url: "/fromMal",
    handler: <RouteHandler>controller.fetchFilteredAnime
  }
];
