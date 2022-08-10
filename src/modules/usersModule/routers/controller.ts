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
  RouteGenericInterfaceDeleteAnimeListRecord, RouteGenericInterfaceLoginUser, RouteGenericInterfacePromoteUser
} from "../types/reqInterface";
import {logger} from "../../../logger/winlog";
import UserService from "../utils/userService";
import {hash, compare} from "bcryptjs";
// eslint-disable-next-line
import * as fastifyCookie from "@fastify/cookie";
import {createAccessToken, createRefreshToken, isEmpty} from "../utils/auth";
import {verify} from "jsonwebtoken";
import serviceClass from "../../../dataSources/knex.utils/serviceClass";
import {isProgress} from "../types/userTypes";


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
      logger.error("Invalid data format");
      return rep.status(400).send({statusCode:400, err:"Invalid data format"});
    }
    const hashedPass = await hash(req.body.password, 12);
    const user = await ServiceClass.createRecord(
      {
        tableName: "users",
        columnObject: {
          username: req.body.username,
          password: hashedPass,
          age: req.body.age,
          city: req.body.city,
          is_admin: "false"
        }
      }
    );
    
    logger.info(user);
    return rep.status(200).send(user);
  } catch (e) {
    logger.error(e);
    return rep.status(400).send({statusCode:400 ,err:JSON.stringify(e)});
  }
};

export const createAdmin = async (
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
      logger.error("Invalid data format");
      return rep.status(400).send({statusCode:400, err:"Invalid data format"});
    }
    const hashedPass = await hash(req.body.password, 12);
    const user = await ServiceClass.createRecord(
      {
        tableName: "users",
        columnObject: {
          username: req.body.username,
          password: hashedPass,
          age: req.body.age,
          city: req.body.city,
          is_admin: "true"
        }
      }
    );

    logger.info(user);
    return rep.status(200).send(user);
  } catch (e) {
    logger.error(e);
    return rep.status(400).send({statusCode:400 ,err:JSON.stringify(e)});
  }
};

export const promoteUser = async (
  req: FastifyRequest<RouteGenericInterfacePromoteUser>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    const user = await ServiceClass.updateRecord(
      {
        tableName: "users",
        columnObject: {
          is_admin: "true"
        },
        searchBy: ["id"],
        value: [req.params.userId]
      }
    );

    logger.info(user);
    if (isEmpty(user!.res)){
      return rep.status(404).send({statusCode:404, mes:"user not found", res:user});
    }

    return rep.status(200).send(user);
  } catch (e) {
    logger.error(e);
    return rep.status(400).send({statusCode:400 ,err:JSON.stringify(e)});
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
        searchBy: ["id"],
        value: [req.params.userId]
      }
    );

    logger.info(user);
    if (isEmpty(user!.res)){
      return rep.status(404).send({statusCode:404, mes:"user not found"});
    }

    return rep.status(200).send(user);
  } catch (e) {
    logger.error(e);
    return rep.status(400).send({statusCode:400 ,err:JSON.stringify(e)});
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
      logger.error("Invalid data format");
      return rep.status(400).send({statusCode:400, err:"Invalid data format"});
    }
    let hashedPass = null;
    if(req.body.newPassword){
      hashedPass = await hash(req.body.newPassword, 12);
    }
    const user = await ServiceClass.updateRecord(
      {
        tableName: "users",
        columnObject: {
          username: req.body.newUsername,
          password: hashedPass ? hashedPass : "",
          age: req.body.newAge,
          city: req.body.newCity
        },
        searchBy: ["id"],
        value: [req.body.userId]
      }
    );
    logger.info(user);
    if (isEmpty(user!.res)){
      return rep.status(404).send({statusCode:404,mes:"user not found"});
    }
    return rep.status(200).send(user);
  } catch (e) {
    logger.error(e);
    return rep.status(400).send({statusCode:400 ,err:JSON.stringify(e)});
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
        searchBy: ["id"],
        value: [req.params.userId]
      }
    );

    logger.info(user);
    if (isEmpty(user!.res)){
      return rep.status(404).send({statusCode:404, mes:"user not found"});
    }
    return rep.status(200).send(user);
  } catch (e) {
    logger.error(e);
    return rep.status(400).send({statusCode:400,err:JSON.stringify(e)});
  }
};

export const createAnimeListRecord = async (
  req: FastifyRequest<RouteGenericInterfaceAnimeListRecord>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    if ( req.body.score > 10
      || req.body.score < 0
      || !isProgress(req.body.progress)
    ) {
      logger.error("Invalid data format");
      return rep.status(400).send({statusCode:400, err:"Invalid data format"});
    }

    logger.info(isProgress(req.body.progress));


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
    logger.info(record);
    return rep.status(200).send(record);
  } catch (e) {
    logger.error(e);
    return rep.status(400).send({statusCode:400,error:JSON.stringify(e)});
  }
};

export const readUsersAnimeList = async (
  req: FastifyRequest<RouteGenericInterfaceGetAnimeListRecord>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    const records = await ServiceClass.getRecord(
      {
        tableName: "anime_list",
        searchBy: ["user_id"],
        value: [req.params.userId]
      }
    );
    if (isEmpty(records!.res)){
      return rep.status(404).send({statusCode:404, error:"list not found"});
    }
    logger.info(records);
    return rep.status(200).send(records);
  } catch (e) {
    logger.error(e);
    return rep.status(400).send({statusCode:400,error:JSON.stringify(e)});
  }
};

export const getAnimeListRecord = async (
  req: FastifyRequest<RouteGenericInterfaceGetAnimeListRecord>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    const record = await ServiceClass.getRecord(
      {
        tableName: "anime_list",
        searchBy: [`title_id`, `user_id`],
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value: [req.params.titleId!, req.params.userId]
      }
    );
    if (isEmpty(record!.res)){
      return rep.status(404).send({statusCode:404, error:"record not found"});
    }
    logger.info(record);
    return rep.status(200).send(record);
  } catch (e) {
    logger.error(e);
    return rep.status(400).send({statusCode:400,error:JSON.stringify(e)});
  }
};

export const updateAnimeListRecord = async (
  req: FastifyRequest<RouteGenericInterfaceUpdateAnimeListRecord>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try {
    if ( req.body.newScore > 10
        || req.body.newScore < 0
        || !isProgress(req.body.newProgress)
    ) {
      logger.error("Invalid data format");
      return rep.status(400).send({statusCode:400, error:"Invalid data format"});
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
    logger.info(record);
    return rep.status(200).send(record);
  } catch (e) {
    logger.error(e);
    return rep.status(400).send({statusCode:400,error:JSON.stringify(e)});
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
    logger.info(record);
    if (isEmpty(record!.res)){
      return rep.status(400).send({statusCode:400,error:"record not found"});
    }
    return rep.status(200).send({mes:"record deleted", ...record});
  } catch (e) {
    logger.error(e);
    return rep.status(400).send({statusCode:400,error:JSON.stringify(e)});
  }
};

export const loginUser = async (
  req: FastifyRequest<RouteGenericInterfaceLoginUser>,
  rep: FastifyReply
):Promise<FastifyReply> => {
  rep.header('Access-Control-Allow-Credentials', 'true');
  try {
    let user = await UserService.findUserByUsername(req.body.username);
    user = user[0];
    const valid = await compare(req.body.password, user.password);
    if (!valid) {throw new Error("wrong password");}

    rep.setCookie('jid', createRefreshToken({userId: user.id}), {
      httpOnly:true,
      path:'/',
    });

    return rep.status(200).send({
      statusCode:200,
      accessToken: createAccessToken({userId: user.id, isAdmin: user.is_admin})
    });
  }
  catch (e) {
    logger.error(e);
    return rep.status(400).send({statusCode:400, error:JSON.stringify(e)});
  }
};

export const refreshToken = async (
  req: FastifyRequest,
  rep: FastifyReply
):Promise<FastifyReply> => {
  try{
    const token = req.cookies.jid;
    if (!token){
      return rep.status(503).send({statusCode:503, accessToken:"", error: "no token"});
    }
    let payload:any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    }
    catch (er){
      return rep.status(503).send({statusCode:503, accessToken:"", error:er});
    }
    let user:any = await serviceClass.findOne({id : payload.userId}, "users");
    user = user.res[0];
    if (!user){
      return rep.status(503).send({statusCode:503, accessToken:"", error: "no user found"});
    }

    rep.setCookie('jid', createRefreshToken({userId: user.id}), {
      httpOnly:true,
      path:'/',
    });

    return rep.status(200).send({
      statusCode:200,
      accessToken:createAccessToken({userId: user.id, isAdmin: user.is_admin})
    });
  }
  catch (e){
    logger.error(e);
    return rep.status(400).send({statusCode:400,errpr:JSON.stringify(e)});
  }
};

