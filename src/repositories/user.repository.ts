import { UserRepository } from "../contracts/user-repository.contracts";
import { users } from "../databases/user.databese";
import { User } from "../models/user";


export class UserRepositoryInMemory implements UserRepository {

    public create(newUser: User): void {

        const existsUsername = users.some((user) => user.username === newUser.username);

        if (existsUsername) {
            throw Error('Já existe esse username')
        }

        const existsEmail = users.some((user) => user.email === newUser.email)

        if (existsEmail) {
            throw Error('Já existe esse E-mail cadastrado')
        }
        users.push(newUser)

    }

}


//like == comment