import express from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController,
} from "./project.controller";

const projectRouter = express.Router();

projectRouter.use(authMiddleware); // All routes require auth

projectRouter.post("/", createProjectController);
projectRouter.get("/", getAllProjectsController);
projectRouter.get("/:id", getProjectByIdController);
projectRouter.put("/:id", updateProjectController);
projectRouter.delete("/:id", deleteProjectController);

export default projectRouter;
