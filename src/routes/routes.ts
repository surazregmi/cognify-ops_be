import authRouter from "@/modules/auth/auth.routes";
import userRouter from "@/modules/user/user.routes";
import projectRouter from "@/modules/project/project.routes";
import express from "express";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/projects", projectRouter);

export default router;
