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
  public created_at?: Date;
  public updated_at?: Date;
}

export default function (sequelize: Sequelize): typeof ProjectModel {
  ProjectModel.init(
    {
      project_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // refers to users table
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
