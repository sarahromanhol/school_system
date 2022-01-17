import { Hobbie } from "../model/Hobbie";
import { Student } from "../model/Student";
import { IdGenerator } from "../services/idGenerator";
import { BaseDatabase } from "./BaseDatabase";
import { HobbieDatabase } from "./HobbieDatabase";

export class StudentDatabase extends BaseDatabase {
    public async create(student: Student): Promise<void> {
        try {
            const hobbieDatabase = new HobbieDatabase();
            const hobbies = student.getHobbies();

            const idGenerator = new IdGenerator();

            Promise.resolve(
                hobbies.map(async (hobbie) => {
                    const alreadyExists = await hobbieDatabase.getByValue(hobbie);

                    if (!alreadyExists) {
                        const newHobbie = new Hobbie(idGenerator.generate(), hobbie);
                        await hobbieDatabase.create(newHobbie)
                    }
                })
            );

            await this.getConnection()
                .insert({
                    id: student.getId(),
                    nome: student.getName(),
                    email: student.getEmail(),
                    data_nasc: student.getBirthdate(),
                    turma_id: student.getClassId(),
                    hobbies: JSON.stringify(hobbies),
                })
                .into(this.tableNames.students)




        } catch (e: any) {
            if (e instanceof Error) {
                throw new Error(e.message)
            }
        }
    }


    public async getByName(name: string): Promise<Student[]> {
        try {
            const students = await this.getConnection()
                .where("nome", name)
                .select("*")
                .from(this.tableNames.students);

            return students.map((student: any) => {
                return Student.toStudentModel(student);
            });
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error("Erro desconhecido");
            }
        }
    }




}