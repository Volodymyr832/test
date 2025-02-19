import { User, ShortUser } from './types';

export class UserTransformer {
    shortUser: ShortUser;

    constructor(user: User) {
        this.shortUser = {
            id: user.id,
            name: user.name,
            city: user.address.city,
            companyName: user.company.name
        };
    }

    printShortInfo() {
        console.log(`User #${this.shortUser.id}: ${this.shortUser.name}, ${this.shortUser.city}, ${this.shortUser.companyName}`);
    }
}
