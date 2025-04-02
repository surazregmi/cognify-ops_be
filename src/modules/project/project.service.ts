import * as repo from "./project.repo";

import { CustomError } from "@/utils/custom-error";
import {
  validateCreateProject,
  validateUpdateProject,
} from "./project.validator";

export const createProject = async (data: any, userId: number) => {
  const { error } = validateCreateProject(data);
  if (error) throw new CustomError(error.details[0].message, 400);

  return await repo.createProject({ ...data, created_by: userId });
};

export const getProjectsByUser = async (userId: number) => {
  return await repo.getProjectsByUser(userId);
};

export const getProjectById = async (projectId: number) => {
  const project = await repo.getProjectById(projectId);
  if (!project) throw new CustomError("Project not found", 404);
  return project;
};

export const updateProject = async (projectId: number, updates: any) => {
  const { error } = validateUpdateProject(updates);
  if (error) throw new CustomError(error.details[0].message, 400);

  const project = await repo.updateProject(projectId, updates);
  if (!project) throw new CustomError("Project not found", 404);
  return project;
};

export const deleteProject = async (projectId: number) => {
  const deleted = await repo.deleteProject(projectId);
  if (!deleted) throw new CustomError("Project not found", 404);
};
