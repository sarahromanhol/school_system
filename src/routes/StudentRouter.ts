import express from 'express'
import { StudentController } from '../controller/StudentController';

export const studentRouter = express.Router();

const studentController = new StudentController();

studentRouter.post("/", studentController.create);
studentRouter.get("/", studentController.getByName);
