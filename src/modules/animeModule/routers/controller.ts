import { FastifyReply, FastifyRequest } from "fastify";
import ServiceClass from "../../../dataSources/knex.utils/serviceClass";
import {
  RouteGenericInterfaceAnime,
  RouteGenericInterfaceGetAnime,
  RouteGenericInterfaceUpdateAnime,
  RouteGenericInterfaceDeleteAnime
} from "../types/reqInterface";
import { RouteGenericInterfaceFetchFiltered } from "../types/reqInterface";
import { fetchFiltered } from "../utils/MALRequests";
import {logger} from "../../../logger/winlog";

export const createAnime = async (
  req: FastifyRequest<RouteGenericInterfaceAnime>,
  rep: FastifyReply
): Promise<FastifyReply> => {
  try {
    if (
      req.body.title.length > 50 ||
      req.body.title.length < 4 ||
      req.body.studio.length > 16 ||
      req.body.studio.length < 6 ||
      //(req.body.startYear && req.body.endYear && Date.parse(req.body.startYear) > Date.parse(req.body.endYear)) ||
      req.body.avgScore > 10 ||
      req.body.avgScore < 0
    ) {
      logger.error("Invalid data format");
      return rep.status(400).send("Invalid data format");
    }

    const anime = await ServiceClass.createRecord(
      {
        tableName: "anime",
        columnObject: {
          title: req.body.title,
          studio: req.body.studio,
          start_year: req.body.startYear,
          end_year: req.body.endYear,
          avg_score: req.body.avgScore,
          genre: req.body.genre,
          status: req.body.status
        }
      }
    );
    logger.info("response", anime);
    return rep.status(200).send(anime);


  } catch (e) {
    logger.error("error", e);
    return rep.status(400).send(JSON.stringify(e));
  }
};


export const readAnime = async (
  req: FastifyRequest<RouteGenericInterfaceGetAnime>,
  rep: FastifyReply
): Promise<FastifyReply> => {
  try {
    const anime = await ServiceClass.getRecord(
      {
        tableName: "anime",
        searchBy: "title",
        value: req.params.title
      }
    );
    logger.info("response", anime);
    return rep.status(200).send(anime);
  } catch (e) {
    logger.error("error", e);
    return rep.status(400).send(JSON.stringify(e));
  }
};

export const updateAnime = async (
  req: FastifyRequest<RouteGenericInterfaceUpdateAnime>,
  rep: FastifyReply
): Promise<FastifyReply> => {
  try {
    if (
      (req.body.newTitle && (req.body.newTitle.length > 50 || req.body.newTitle.length < 4)) ||
      (req.body.newStudio && (req.body.newStudio.length > 16 || req.body.newStudio.length < 6)) ||
      //(req.body.newStartYear && req.body.newEndYear && Date.parse(req.body.newStartYear) > Date.parse(req.body.newEndYear)) ||
      (req.body.newAvgScore && (req.body.newAvgScore > 10 || req.body.newAvgScore < 0))
    ) {
      logger.error("Invalid data format");
      rep.status(400).send("Invalid data format");
    }
    const anime = await ServiceClass.updateRecord(
      {
        tableName: "anime",
        columnObject: {
          title: req.body.newTitle,
          studio: req.body.newStudio,
          start_year: req.body.newStartYear,
          end_year: req.body.newEndYear,
          avg_score: req.body.newAvgScore,
          genre: req.body.newGenre,
          status: req.body.newStatus
        },
        searchBy: ["title"],
        value: [req.body.title]
      }
    );
    logger.info("response", anime);
    return rep.status(200).send(anime);
  } catch (e) {
    logger.error("error", e);
    return rep.status(400).send(JSON.stringify(e));
  }
};

export const deleteAnime = async (
  req: FastifyRequest<RouteGenericInterfaceDeleteAnime>,
  rep: FastifyReply
): Promise<FastifyReply> => {
  try {
    const anime = await ServiceClass.deleteRecord(
      {
        tableName: "anime",
        searchBy: ["title"],
        value: [req.params.title]
      }
    );
    logger.info("response", anime);
    return rep.status(200).send(anime);
  } catch (e) {
    logger.error("error", e);
    return rep.status(400).send(JSON.stringify(e));
  }
};
export const fetchFilteredAnime = async (
  req: FastifyRequest<RouteGenericInterfaceFetchFiltered>,
  rep: FastifyReply
): Promise<FastifyReply> => {
  try {
    const filtered = await fetchFiltered(
      {
        type: req.query.type,
        minScore: Number.parseInt(req.query.minScore, 10),
        maxScore: Number.parseInt(req.query.maxScore, 10),
        status: req.query.status,
        orderBy: req.query.orderBy
      }
    );
    logger.info("response", filtered.data);
    return rep.status(200).send(JSON.stringify(filtered.data));
  } catch (e) {
    logger.error("error", e);
    return rep.status(400).send(JSON.stringify(e));
  }
};


