import {
  RequestBodyDefault,
  RequestHeadersDefault,
  RequestQuerystringDefault,
  RequestParamsDefault
} from "fastify";
import { ReplyGenericInterface } from "fastify/types/reply";
import { genre, status } from "./animeTypes";

interface RequestGenericInterfaceCreateAnime {
  Body: {
    title: string;
    studio: string;
    startYear?: string;
    endYear?: string;
    avgScore: number;
    status: status;
    genre: genre;
  };
  Querystring?: RequestQuerystringDefault;
  Params?: RequestParamsDefault;
  Headers?: RequestHeadersDefault;
}

interface RequestGenericInterfaceReadAnime {
  Body?: RequestBodyDefault;
  Querystring?: RequestQuerystringDefault;
  Params: {
    id: number;
  };
  Headers?: RequestHeadersDefault;
}

interface RequestGenericInterfaceUpdateAnime {
  Body: {
    titleId: number;
    newTitle?: string;
    newStudio?: string;
    newStartYear?: string;
    newEndYear?: string;
    newAvgScore?: number;
    newStatus?: status;
    newGenre?: genre;
  };
  Querystring?: RequestQuerystringDefault;
  Params?: RequestParamsDefault;
  Headers?: RequestHeadersDefault;
}

interface RequestGenericInterfaceDeleteAnime {
  Params: {
    id: number;
  };
}

interface RequestGenericInterfaceFetchFiltered {
  Querystring: {
    type: string
    minScore: string
    maxScore: string
    status: string
    orderBy: string
  };
}


export interface RouteGenericInterfaceDeleteAnime
  extends RequestGenericInterfaceDeleteAnime,
    ReplyGenericInterface {
}

export interface RouteGenericInterfaceUpdateAnime
  extends RequestGenericInterfaceUpdateAnime,
    ReplyGenericInterface {
}

export interface RouteGenericInterfaceAnime
  extends RequestGenericInterfaceCreateAnime,
    ReplyGenericInterface {
}

export interface RouteGenericInterfaceGetAnime
  extends RequestGenericInterfaceReadAnime,
    ReplyGenericInterface {
}

export interface RouteGenericInterfaceFetchFiltered
  extends RequestGenericInterfaceFetchFiltered,
    ReplyGenericInterface {
}
