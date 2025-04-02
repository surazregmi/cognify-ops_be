import { Request, Response, NextFunction } from "express";
import * as projectService from "./project.service";

/**
 * Create project
 * @param req
 * @param res
 * @param next
 */
export const createProjectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.context?.userId;
    const project = await projectService.createProject(req.body, userId);
    res.status(201).json({ message: "Project created", data: project });
  } catch (error) {
    next(error);
  }
};

/**
 * get all project based on users
 * @param req
 * @param res
 * @param next
 */
export const getAllProjectsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.context?.userId;
    const projects = await projectService.getProjectsByUser(userId);
    res.status(200).json({ message: "Projects fetched", data: projects });
  } catch (error) {
    next(error);
  }
};

/**
 * Function to get projects by id
 *
 * @param req
 * @param res
 * @param next
 */
export const getProjectByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await projectService.getProjectById(Number(req.params.id));
    res.status(200).json({ message: "Project fetched", data: project });
  } catch (error) {
    next(error);
  }
};

/**
 * Function to update project
 *
 * @param req
 * @param res
 * @param next
 */
export const updateProjectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await projectService.updateProject(
      Number(req.params.id),
      req.body
    );
    res.status(200).json({ message: "Project updated", data: updated });
  } catch (error) {
    next(error);
  }
};

/**
 * Function to delete project
 *
 * @param req
 * @param res
 * @param next
 */
export const deleteProjectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await projectService.deleteProject(Number(req.params.id));
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};
