import { fetchUser } from './apiService';
import { UserTransformer } from './transformer';
import { UserEntity, CompanyEntity } from './abstraction';

const API_URL = 'https://jsonplaceholder.typicode.com/users/1';

async function main() {
    try {
        const user = await fetchUser(API_URL);
        console.log('Full user:', user);

        const transformedUser = new UserTransformer(user);
        transformedUser.printShortInfo();

        const userEntity = new UserEntity(user.name, user.email);
        userEntity.displayInfo();

        const companyEntity = new CompanyEntity(user.company.name);
        companyEntity.displayInfo();
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
