import { UserRepository } from "../contracts/user-repository.contracts";
import { users } from "../databases/user.databese";
import { User } from "../models/user";


export class UserRepositoryInMemory implements UserRepository {

    public create(newUser: User): void {
        const found = users.some((user) => user.email === newUser.email)

        if (found) {
            throw Error("E-mail já cadastrado")
        }

        users.push(newUser)
    }

}