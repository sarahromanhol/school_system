import { BaseDatabase } from "./BaseDatabase";
import { Hobbie } from "../model/Hobbie";

export class HobbieDatabase extends BaseDatabase {
    public async create(turma: Hobbie): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: turma.getId(),
                    valor: turma.getValue(),
                })
                .into(this.tableNames.classes);
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
        }
    }

    public async getByValue(hobbieValue: string): Promise<Hobbie | undefined> {
        try {
            const hobbie = await this.getConnection()
                .where("valor", hobbieValue)
                .select("*")
                .from(this.tableNames.classes);

            return Hobbie.toHobbieModel(hobbie[0]);
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error("Erro desconhecido");
            }
        }
    }
}
