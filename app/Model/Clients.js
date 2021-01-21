import * as SQLite from "expo-sqlite";
import Sequelize from "rn-sequelize";

const Op = Sequelize.Op;
const Model = Sequelize.Model;

const sequelize = new Sequelize({
  dialectModule: SQLite,
  database: "data",
  dialectOptions: {
      version: "1.0",
      description: "Test DB"
      //size: 2 * 1024 * 1024
  }
})

export default class Clients extends Model {}

Clients.init(
  {
    name: Sequelize.STRING,
    lastName: Sequelize.STRING
  },
  {
    sequelize,
    modelName: "user"
  }
);

