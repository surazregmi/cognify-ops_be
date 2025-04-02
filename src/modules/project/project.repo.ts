import { DB } from "@/database/index";

export const createProject = async (data: any) => {
  return await DB.Projects.create(data);
};

export const getProjectsByUser = async (userId: number) => {
  return await DB.Projects.findAll({
    where: { created_by: userId },
    include: [
      {
        model: DB.Users,
        as: "creator",
        attributes: ["id", "name", "email", "username"], // select only what you need
      },
    ],
  });
};

export const getProjectById = async (projectId: number) => {
  return await DB.Projects.findByPk(projectId, {
    include: [
      {
        model: DB.Users,
        as: "creator",
        attributes: ["id", "name", "email", "username"],
      },
    ],
  });
};

export const updateProject = async (projectId: number, updates: any) => {
  const project = await DB.Projects.findByPk(projectId);
  if (!project) return null;
  await project.update(updates);
  return project;
};

export const deleteProject = async (projectId: number) => {
  const deletedCount = await DB.Projects.destroy({
    where: { project_id: projectId },
  });
  return deletedCount > 0;
};
