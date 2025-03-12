export abstract class Entity {
    abstract displayInfo(): void;
}

export class UserEntity extends Entity {
    private name: string;
    private email: string;

    constructor(name: string, email: string) {
        super();
        this.name = name;
        this.email = email;
    }

    displayInfo(): void {
        console.log(`User: ${this.name}, Email: ${this.email}`);
    }
}

export class CompanyEntity extends Entity {
    private companyName: string;

    constructor(companyName: string) {
        super();
        this.companyName = companyName;
    }

    displayInfo(): void {
        console.log(`Company: ${this.companyName}`);
    }
}
