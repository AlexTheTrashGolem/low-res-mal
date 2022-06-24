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
    return knexCon(data.tableName).insert(data.columnObject);


  }
  getRecord(data: readRecordType): QueryBuilder{
    return knexCon(data.tableName)
      .select().where(data.searchBy, data.value);
  }
  updateRecord(data: updateRecordType){
    return knexCon(data.tableName)
      .where(() => {
        const chain = [];
        for(let i=0; i<data.value.length; i++){
          chain.push([data.searchBy[i], data.value[i]]);
        }
        return Object.fromEntries(chain);
      })
      .insert(data.columnObject);
  }
  deleteRecord(data: deleteRecordType): QueryBuilder{
    return knexCon.where(() => {
      const chain = [];
      for(let i=0; i<data.value.length; i++){
        chain.push([data.searchBy[i], data.value[i]]);
      }
      return Object.fromEntries(chain);
    }).del();
  }
}

export default new ServiceClass();