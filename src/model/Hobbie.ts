export class Hobbie {
    constructor(private id: string, private value: string) { }

    getId() {
        return this.id;
    }

    getValue() {
        return this.value;
    }

    setId(id: string) {
        this.id = id;
    }

    setValue(value: string) {
        this.value = value;
    }

    static toHobbieModel(data?: any): Hobbie {
        return data && new Hobbie(data.id, data.valor);
    }
}
