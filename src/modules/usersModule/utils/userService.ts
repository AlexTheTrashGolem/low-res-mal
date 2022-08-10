import {knexCon} from "../../../dataSources/knex.utils/knex";
import {Knex} from "knex";
//import {loginType} from "../types/userTypes";

class UserService {
  findUserByUsername(username: string): Knex.QueryBuilder{
    const query = knexCon('users').select().where('username', username);
    return query;
  }

}

export default new UserService();