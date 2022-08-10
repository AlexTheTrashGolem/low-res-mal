import {knexCon} from "./knex";
import {
  createRecordType,
  deleteRecordType,
  readRecordType,
  updateRecordType
} from "../../types/crudTypes";
//import knex from "knex";
//import QueryBuilder = knex.QueryBuilder;
//import {error} from "winston";
import {logger} from "../../logger/winlog";


class ServiceClass {
  createRecord(data: createRecordType){
    return knexCon(data.tableName).returning(Object.keys(data.columnObject)).insert(data.columnObject)
      .then(result =>{
        return {statusCode:200, res: result};
      })
      .catch(error => {
        logger.error("Your Error" +JSON.stringify(error));
        if (error.code == "23505"){
          return {statusCode: 400, error:"Record already exist", res:{}};
        }
      });
  }
  getRecord(data: readRecordType){
    const makeCondition = () => {
      const chain = [];
      for(let i=0; i<data.value.length; i++){
        chain.push([data.searchBy[i], data.value[i]]);
      }
      return Object.fromEntries(chain);
    };
    const query = knexCon(data.tableName).select().where(makeCondition());
    return query.then(result =>{
      return {statusCode:200, res: result};
    });
  }

  updateRecord(data: updateRecordType){
    const makeCondition = () => {
      const chain = [];
      for(let i=0; i<data.value.length; i++){
        chain.push([data.searchBy[i], data.value[i]]);
      }
      return Object.fromEntries(chain);
    };
    const query = knexCon(data.tableName)
      .returning(Object.keys(data.columnObject))
      .where(makeCondition())
      .update(data.columnObject);
    return query.then(result =>{
      return {statusCode:200, res: result};
    }).catch(error => {
      logger.error("Your Error" +JSON.stringify(error));
      if (error.code == "23505"){
        return {statusCode: 400, error:"Record already exist", res:{}};
      }
    });
  }
  deleteRecord(data: deleteRecordType){
    const makeCondition = () => {
      const chain = [];
      for(let i=0; i<data.value.length; i++){
        chain.push([data.searchBy[i], data.value[i]]);
      }
      return Object.fromEntries(chain);
    };
    const query = knexCon(data.tableName).where(makeCondition()).del();
    return query.then(result =>{
      return {statusCode:200, res: result};
    });
  }
  findOne(condition:any, tableName:string){
    const query = knexCon(tableName).select().limit(1).where(condition);
    return query.then(result =>{
      return {statusCode:200, res: result};
    });
  }
}

export default new ServiceClass();