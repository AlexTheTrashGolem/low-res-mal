import {sign, verify} from "jsonwebtoken";
import {FastifyReply, FastifyRequest, HookHandlerDoneFunction} from "fastify";
import {logger} from "../../../logger/winlog";
import {RouteGenericInterfaceDeleteUser, RouteGenericInterfaceUpdateUser} from "../types/reqInterface";

export function isEmpty(obj:any):boolean {return !(() => {for (const i in obj) {return true;}return false;})();}
export const createAccessToken = (payload:{[key:string]:string|number|undefined}): string=>{
  return sign(payload, <string>process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  });
};

export const createRefreshToken = (payload:{[key:string]:string|number|undefined}): string=>{
  return sign(payload, <string>process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });
};

export const isAuth = (req: FastifyRequest, rep: FastifyReply, next: HookHandlerDoneFunction) =>{
  const auth = req.headers.authorization;
  if(!auth){
    throw new Error("not authenticated");
  }
  try{
    const payload: any = verify(auth.split(" ")[1], process.env.ACCESS_TOKEN_SECRET!);
    req.requestContext.set('user', {userId: payload.userId});
    next();
  } catch (err){
    logger.error(err);
    throw new Error("not authenticated");
  }
};

export const isAdmin = (req: FastifyRequest, rep: FastifyReply, next: HookHandlerDoneFunction) =>{
  const auth = req.headers.authorization!;
  try{
    const payload: any = verify(auth.split(" ")[1], process.env.ACCESS_TOKEN_SECRET!);
    if (payload.isAdmin){
      next();
    }
    else{
      logger.error("not an admin");
      throw new Error("not an admin");
    }
  } catch (err){
    logger.error(err);
    throw new Error("not authenticated");
  }
};

export const isSameUser = (req: FastifyRequest<RouteGenericInterfaceUpdateUser | RouteGenericInterfaceDeleteUser>, rep: FastifyReply, next: HookHandlerDoneFunction) =>{
  const auth = req.headers.authorization!;
  try{
    const payload: any = verify(auth.split(" ")[1], process.env.ACCESS_TOKEN_SECRET!);
    if (req.params && !isEmpty(req.params)){
      if (req.params.userId == parseInt(payload.userId)){
        next();
      }
      else{
        logger.error(typeof req.params.userId);
        logger.error(typeof parseInt(payload.userId));
        throw new Error("wrong params");
      }
    }
    if(req.body && !isEmpty(req.body)){
      if (req.body.userId === payload.userId){
        next();
      }
      else{
        logger.error("wrong user");
        throw new Error("wrong body");
      }
    }
  } catch (err){
    logger.error("Params error" + JSON.stringify(req.params));
    logger.error("Body error" + JSON.stringify(req.body));
    throw new Error(<string>err);
  }
};


