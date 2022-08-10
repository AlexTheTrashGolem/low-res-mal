import { RouteOptions } from "@fastify/websocket";
import { RegisterOptions, RouteHandler } from "fastify";
import * as controller from "./controller";
import {isAdmin, isAuth} from "../../usersModule/utils/auth";

export const opts: RegisterOptions = {
  prefix: "/anime"
};

export const routes: RouteOptions[] = [
  {
    method: "POST",
    url: "/createAnime",
    handler: <RouteHandler>controller.createAnime,
    preValidation: [isAuth,isAdmin]
  },
  {
    method: "GET",
    url: "/:id",
    handler: <RouteHandler>controller.readAnime
  },
  {
    method: "PUT",
    url: "/updateAnime",
    handler: <RouteHandler>controller.updateAnime,
    preValidation: [isAuth,isAdmin]
  },
  {
    method: "DELETE",
    url: "/:id",
    handler: <RouteHandler>controller.deleteAnime,
    preValidation: [isAuth,isAdmin]
  },
  {
    method: "GET",
    url: "/fromMal",
    handler: <RouteHandler>controller.fetchFilteredAnime
  }
];
