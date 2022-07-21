import {
  RequestBodyDefault,
  RequestHeadersDefault,
  RequestQuerystringDefault,
  RequestParamsDefault
} from "fastify";
import { ReplyGenericInterface } from "fastify/types/reply";
import { progress } from "./userTypes";

interface RequestGenericInterfaceCreateUser {
  Body: {
    username: string;
    age?: number;
    password: string;
    city?: string;
    isAdmin: boolean;
  };
  Querystring?: RequestQuerystringDefault;
  Params?: RequestParamsDefault;
  Headers?: RequestHeadersDefault;
}


interface RequestGenericInterfaceReadUser {
  Body?: RequestBodyDefault;
  Querystring?: RequestQuerystringDefault;
  Params: {
    id: number;
  };
  Headers?: RequestHeadersDefault;
}

interface RequestGenericInterfaceUpdateUser {
  Body: {
    userId: number;
    newUsername?: string;
    newAge?: number;
    newPassword?: string;
    newCity?: string;
  };
  Querystring?: RequestQuerystringDefault;
  Params?: RequestParamsDefault;
  Headers?: RequestHeadersDefault;
}


interface RequestGenericInterfaceDeleteUser {
  Params: {
    id: number;
  };
}

interface RequestGenericInterfaceCreateAnimeListRecord {
  Body: {
    userId: number;
    titleId: number;
    score: number;
    progress: progress;
  };
  Querystring?: RequestQuerystringDefault;
  Params?: RequestParamsDefault;
  Headers?: RequestHeadersDefault;
}

interface RequestGenericInterfaceReadAnimeListRecord {
  Body?: RequestBodyDefault;
  Querystring?: RequestQuerystringDefault;
  Params: {
    userId: number;
    titleId?: number;
  };
  Headers?: RequestHeadersDefault;
}

interface RequestGenericInterfaceUpdateAnimeListRecord {
  Body: {
    userId: number;
    titleId: number;
    newScore: number;
    newProgress: progress;
  };
  Querystring?: RequestQuerystringDefault;
  Params?: RequestParamsDefault;
  Headers?: RequestHeadersDefault;
}

interface RequestGenericInterfaceDeleteAnimeListRecord {
  Body: {
    userId: number;
    titleId: number;
  };
}


export interface RouteGenericInterfaceDeleteAnimeListRecord
  extends RequestGenericInterfaceDeleteAnimeListRecord,
    ReplyGenericInterface {
}

export interface RouteGenericInterfaceUpdateAnimeListRecord
  extends RequestGenericInterfaceUpdateAnimeListRecord,
    ReplyGenericInterface {
}

export interface RouteGenericInterfaceAnimeListRecord
  extends RequestGenericInterfaceCreateAnimeListRecord,
    ReplyGenericInterface {
}

export interface RouteGenericInterfaceGetAnimeListRecord
  extends RequestGenericInterfaceReadAnimeListRecord,
    ReplyGenericInterface {
}

export interface RouteGenericInterfaceDeleteUser
  extends RequestGenericInterfaceDeleteUser,
    ReplyGenericInterface {
}

export interface RouteGenericInterfaceUpdateUser
  extends RequestGenericInterfaceUpdateUser,
    ReplyGenericInterface {
}

export interface RouteGenericInterfaceUser
  extends RequestGenericInterfaceCreateUser,
    ReplyGenericInterface {
}

export interface RouteGenericInterfaceGetUser
  extends RequestGenericInterfaceReadUser,
    ReplyGenericInterface {
}

