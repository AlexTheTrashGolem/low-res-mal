import {knexCon} from "./knex";
import {
  createRecordType,
  deleteRecordType,
  readRecordType,
  updateRecordType
} from "../../types/crudTypes";
import knex from "knex";
import QueryBuilder = knex.QueryBuilder;


class ServiceClass {
  createRecord(data: createRecordType): QueryBuilder {
    return knexCon(data.tableName).returning(Object.keys(data.columnObject)).insert(data.columnObject);


  }
  getRecord(data: readRecordType): QueryBuilder{
    const query = knexCon(data.tableName).select().where(data.searchBy, data.value);
    return query;
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
    return query;
  }
  deleteRecord(data: deleteRecordType): QueryBuilder{
    const makeCondition = () => {
      const chain = [];
      for(let i=0; i<data.value.length; i++){
        chain.push([data.searchBy[i], data.value[i]]);
      }
      return Object.fromEntries(chain);
    };
    return knexCon(data.tableName).returning(data.searchBy).where(makeCondition()).del();
  }
}

export default new ServiceClass();