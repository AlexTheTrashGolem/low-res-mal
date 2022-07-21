import { RouteOptions } from "@fastify/websocket";
import { RegisterOptions, RouteHandler } from "fastify";
import * as controller from "./controller";

export const opts: RegisterOptions = {
  prefix: "/users"
};

export const routes: RouteOptions[] = [
  {
    method: "POST",
    url: "/createUser",
    handler: <RouteHandler>controller.createUser
  },
  {
    method: "GET",
    url: "/:id",
    handler: <RouteHandler>controller.readUser
  },
  {
    method: "PUT",
    url: "/updateUser",
    handler: <RouteHandler>controller.updateUser
  },
  {
    method: "DELETE",
    url: "/:id",
    handler: <RouteHandler>controller.deleteUser
  },
  {
    method: "POST",
    url: "/addAnime",
    handler: <RouteHandler>controller.createAnimeListRecord
  },
  {
    method: "GET",
    url: "/:userId/list",
    handler: <RouteHandler>controller.readUsersAnimeList
  },
  {
    method: "GET",
    url: "/:userId/titleId",
    handler: <RouteHandler>controller.getAnimeListRecord
  },
  {
    method: "PUT",
    url: "/changeList",
    handler: <RouteHandler>controller.updateAnimeListRecord
  },
  {
    method: "DELETE",
    url: "/deleteRecord",
    handler: <RouteHandler>controller.deleteAnimeListRecord
  }
];
