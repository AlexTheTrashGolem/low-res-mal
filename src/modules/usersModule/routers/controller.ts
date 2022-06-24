import { FastifyReply, FastifyRequest } from "fastify";
import ServiceClass from "../../../dataSources/knex.utils/serviceClass";
import {
  RouteGenericInterfaceUser,
  RouteGenericInterfaceGetUser,
  RouteGenericInterfaceUpdateUser,
  RouteGenericInterfaceDeleteUser,
  RouteGenericInterfaceAnimeListRecord,
  RouteGenericInterfaceGetAnimeListRecord,
  RouteGenericInterfaceUpdateAnimeListRecord,
  RouteGenericInterfaceDeleteAnimeListRecord
} from "../types/reqInterface";


export const createUser = async (
  req: FastifyRequest<RouteGenericInterfaceUser>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    if (
      req.body.username.length > 20 ||
      req.body.username.length < 4 ||
      req.body.password.length > 16 ||
      req.body.password.length < 6 ||
      (req.body.age && req.body.age > 99) ||
      (req.body.city && (req.body.city.length < 4 || req.body.city.length > 20))
    ) {
      return rep.status(400).send("Invalid data format");
    }
    const user = ServiceClass.createRecord(
      {
        tableName: "users",
        columnObject: {
          username: req.body.username,
          password: req.body.password,
          age: req.body.age,
          city: req.body.city
        }
      }
    );

    return rep.status(200).send(user);
  } catch (e) {
    return rep.status(400).send(JSON.stringify(e));
  }
};


export const readUser = async (
  req: FastifyRequest<RouteGenericInterfaceGetUser>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    const user = await ServiceClass.getRecord(
      {
        tableName: "users",
        searchBy: "username",
        value: req.params.username
      }
    );
    console.log(JSON.stringify(user));

    return rep.status(200).send(user);
  } catch (e) {
    return rep.status(400).send(JSON.stringify(e));
  }
};

export const updateUser = async (
  req: FastifyRequest<RouteGenericInterfaceUpdateUser>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    if (
      (req.body.newUsername && req.body.newUsername.length > 20) ||
        (req.body.newUsername && req.body.newUsername.length < 4) ||
        (req.body.newPassword && req.body.newPassword.length > 16) ||
        (req.body.newPassword && req.body.newPassword.length < 6) ||
        (req.body.newAge && req.body.newAge > 99) ||
        (req.body.newCity && (req.body.newCity.length < 4 || req.body.newCity.length > 20))
    ) {
      return rep.status(400).send("Invalid data format");
    }
    const user = await ServiceClass.updateRecord(
      {
        tableName: "users",
        columnObject: {
          username: req.body.newUsername,
          password: req.body.newPassword,
          age: req.body.newAge,
          city: req.body.newCity
        },
        searchBy: ["id"],
        value: [req.body.userId]
      }
    );
    return rep.status(200).send(user);
  } catch (e) {
    return rep.status(400).send(JSON.stringify(e));
  }
};

export const deleteUser = async (
  req: FastifyRequest<RouteGenericInterfaceDeleteUser>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    const user = await ServiceClass.deleteRecord(
      {
        tableName: "users",
        searchBy: ["username"],
        value: [req.params.username]
      }
    );

    return rep.status(200).send(user);
  } catch (e) {
    return rep.status(400).send(JSON.stringify(e));
  }
};

export const createAnimeListRecord = async (
  req: FastifyRequest<RouteGenericInterfaceAnimeListRecord>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    if (
      req.body.score > 10 ||
      req.body.score < 0
    ) {
      return rep.status(400).send("Invalid data format");
    }
    const record = await ServiceClass.createRecord(
      {
        tableName: "anime_list",
        columnObject: {
          user_id: req.body.userId,
          title_id: req.body.titleId,
          score: req.body.score,
          progress: req.body.progress
        }
      }
    );
    return rep.status(200).send(record);
  } catch (e) {
    return rep.status(404).send(JSON.stringify(e));
  }
};

export const readAnimeListRecord = async (
  req: FastifyRequest<RouteGenericInterfaceGetAnimeListRecord>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    const records = await ServiceClass.getRecord(
      {
        tableName: "anime_list",
        searchBy: "user_id",
        value: req.params.userId
      }
    );
    return rep.status(200).send(records);
  } catch (e) {
    return rep.status(400).send(JSON.stringify(e));
  }
};

export const updateAnimeListRecord = async (
  req: FastifyRequest<RouteGenericInterfaceUpdateAnimeListRecord>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    if (
      req.body.newScore > 10 ||
      req.body.newScore < 0
    ) {
      return rep.status(400).send("Invalid data format");
    }
    const record = await ServiceClass.updateRecord(
      {
        tableName: "anime_list",
        columnObject: {
          score: req.body.newScore,
          progress: req.body.newProgress
        },
        searchBy: [`title_id`, `user_id`],
        value: [req.body.titleId, req.body.userId]
      }
    );
    return rep.status(200).send(record);
  } catch (e) {
    return rep.status(400).send(JSON.stringify(e));
  }
};

export const deleteAnimeListRecord = async (
  req: FastifyRequest<RouteGenericInterfaceDeleteAnimeListRecord>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    const record = await ServiceClass.deleteRecord(
      {
        tableName: "anime_list",
        searchBy: ["user_id", "title_id"],
        value: [req.body.userId, req.body.titleId]
      }
    );
    return rep.status(200).send(record);
  } catch (e) {
    return rep.status(400).send(JSON.stringify(e));
  }
};

