import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { Project } from "@/interfaces/project.interfaces";

export type ProjectCreationAttributes = Optional<
  Project,
  "project_id" | "description" | "created_at" | "updated_at"
>;

export class ProjectModel
  extends Model<Project, ProjectCreationAttributes>
  implements Project
{
  public project_id!: number;
  public name!: string;
  public description?: string;
  public created_by!: number;
  public created_at?: string;
  public updated_at?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ProjectModel {
  ProjectModel.init(
    {
      project_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // match table name of user model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "projects",
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
    }
  );

  return ProjectModel;
}
