import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { StudentDatabase } from "../data/StudentDatabase";
import { BaseError } from "../error/BaseError";
import { InvalidInputError } from "../error/InvalidInputError";
import { NotFoundError } from "../error/NotFoundError";
import { Student } from "../model/Student";
import { IdGenerator } from "../services/idGenerator";

export class StudentController {
    async create(req: Request, res: Response) {
        try {
            const input = req.body;

            if (
                !input.nome ||
                !input.email ||
                !input.data_nasc ||
                !input.turma_id ||
                !input.hobbies
            ) {
                throw new InvalidInputError("Invalid input to create student");
            }


            const idGenerator = new IdGenerator();
            const studentDatabase = new StudentDatabase();
            await studentDatabase.create(
                Student.toStudentModel({
                    ...input,
                    id: idGenerator.generate()
                })
            );

            res.status(200).send({
                message: "Student created successfully"
            });



        } catch (e: any) {
            if (e instanceof BaseError) {
                res.status(e.code || 400).send({
                    message: e.message
                })
            } else {
                console.log(e);
                res.status(400).send({
                    message: "erro desconhecido"
                })
            }




        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    async getByName(req: Request, res: Response) {
        try {
            const name = req.params.nome;

            if (!name) {
                throw new InvalidInputError("Invalid input to get student");
            }

            const studentDatabase = new StudentDatabase();
            const students = await studentDatabase.getByName(name);

            if (!students) {
                throw new NotFoundError(`Students woth name ${name} not found`);
            }

            res.status(200).send(students);



        } catch (e: any) {
            if (e instanceof BaseError) {
                res.status(e.code || 400).send({
                    message: e.message
                });
            } else {
                console.log(e)
                res.status(400).send({
                    message: "erro desconhecido"
                });
            }



        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    async changeClass(req: Request, res: Response) {
        try {
            const input = req.body;

            if(!input.estudante_id || ! input.turma_id) {
                throw new InvalidInputError("Invalid input to change student class");
            }


            const studentDatabase = new StudentDatabase();
            await studentDatabase.changeClass(input.estudante_id, input.turma_id);

            res.status(200).send({
                message: "Student class changed successfully"
            })




        } catch (e: any) {
            if (e instanceof BaseError) {
                res.status(e.code || 400).send({
                    message: e.message
                });
            } else {
                console.log(e)
                res.status(400).send({
                    message: "Erro desconhecido"
                })
            }




        } finally {
            await BaseDatabase.destroyConnection();
        }
    }
}