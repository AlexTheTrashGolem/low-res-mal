import { RouteOptions } from "@fastify/websocket";
import { preValidationHookHandler, RegisterOptions, RouteHandler} from "fastify";
import * as controller from "./controller";
import {isAdmin, isAuth, isSameUser} from "../utils/auth";

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
    method: "POST",
    url: "/createAdmin",
    handler: <RouteHandler>controller.createAdmin,
    preValidation: [isAuth,isAdmin]
  },
  {
    method: "GET",
    url: "/:userId",
    handler: <RouteHandler>controller.readUser,
    preValidation: [isAuth,isAdmin]
  },
  {
    method: "PUT",
    url: "/updateUser",
    handler: <RouteHandler>controller.updateUser,
    preValidation: [isAuth,<preValidationHookHandler>isSameUser]
  },
  {
    method: "PUT",
    url: "/admin/updateUser",
    handler: <RouteHandler>controller.updateUser,
    preValidation: [isAuth,isAdmin]
  },

  {
    method: "PUT",
    url: "/promote/:userId",
    handler: <RouteHandler>controller.promoteUser,
    preValidation: [isAuth,isAdmin]
  },
  {
    method: "DELETE",
    url: "/:userId",
    handler: <RouteHandler>controller.deleteUser,
    preValidation: [isAuth,<preValidationHookHandler>isSameUser]
  },
  {
    method: "DELETE",
    url: "/admin/:userId",
    handler: <RouteHandler>controller.deleteUser,
    preValidation: [isAuth,isAdmin]
  },
  {
    method: "POST",
    url: "/addAnime",
    handler: <RouteHandler>controller.createAnimeListRecord,
    preValidation: [isAuth,<preValidationHookHandler>isSameUser]
  },
  {
    method: "POST",
    url: "/admin/addAnime",
    handler: <RouteHandler>controller.createAnimeListRecord,
    preValidation: [isAuth,isAdmin]
  },
  {
    method: "GET",
    url: "/:userId/list",
    handler: <RouteHandler>controller.readUsersAnimeList
  },
  {
    method: "GET",
    url: "/:userId/:titleId",
    handler: <RouteHandler>controller.getAnimeListRecord
  },
  {
    method: "PUT",
    url: "/changeList",
    handler: <RouteHandler>controller.updateAnimeListRecord,
    preValidation: [isAuth,<preValidationHookHandler>isSameUser]
  },
  {
    method: "PUT",
    url: "/admin/changeList",
    handler: <RouteHandler>controller.updateAnimeListRecord,
    preValidation: [isAuth,isAdmin]
  },
  {
    method: "DELETE",
    url: "/deleteRecord",
    handler: <RouteHandler>controller.deleteAnimeListRecord,
    preValidation: [isAuth,<preValidationHookHandler>isSameUser]
  },
  {
    method: "DELETE",
    url: "/admin/deleteRecord",
    handler: <RouteHandler>controller.deleteAnimeListRecord,
    preValidation: [isAuth,isAdmin]
  },
  {
    method: "POST",
    url: "/login",
    handler: <RouteHandler>controller.loginUser
  },
  {
    method: "POST",
    url: "/refresh_token",
    handler: <RouteHandler>controller.refreshToken
  }

];
