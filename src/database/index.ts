import Sequelize from "sequelize";
import logger from "@/utils/logger";

import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  NODE_ENV,
} from "@/config";

import userModel from "./models/user.model";
import projectModel from "./models/project.model";

const sequelize = new Sequelize.Sequelize(
  DB_NAME as string,
  DB_USERNAME as string,
  DB_PASSWORD,
  {
    dialect: (DB_DIALECT as Sequelize.Dialect) || "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT as string, 10),
    timezone: "+09:00",
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      underscored: true,
      freezeTableName: true,
    },
    pool: {
      min: 0,
      max: 5,
    },
    logQueryParameters: NODE_ENV === "development",
    logging: (query, time) => {
      logger.info(time + "ms" + " " + query);
    },
    benchmark: true,
  }
);

sequelize.authenticate();

// Initialize models
const UserModel = userModel(sequelize);
const ProjectModel = projectModel(sequelize);

// ✅ Define associations here
UserModel.hasMany(ProjectModel, {
  foreignKey: "created_by",
  as: "projects",
});

ProjectModel.belongsTo(UserModel, {
  foreignKey: "created_by",
  as: "creator",
});

export const DB = {
  Users: UserModel,
  Projects: ProjectModel,
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
