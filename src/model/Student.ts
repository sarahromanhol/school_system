

export class Student {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private birthdate: Date,
        private class_id: string,
        private hobbies: string[]
    ) { }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getBirthdate() {
        return this.birthdate;
    }

    getClassId() {
        return this.class_id;
    }

    getHobbies() {
        return this.hobbies;
    }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setBirthdate(birthdate: Date) {
        this.birthdate = birthdate;
    }

    setClassId(class_id: string) {
        this.class_id = class_id;
    }

    setHobbies(hobbies: string[]) {
        this.hobbies = hobbies;
    }

    static toStudentModel(data?: any): Student {
        return (
            data &&
            new Student(
                data.id,
                data.nome,
                data.email,
                data.data_nasc,
                data.turma_id,
                typeof data.hobbies === "string"
                    ? JSON.parse(data.hobbies)
                    : data.hobbies
            )
        );
    }
}
