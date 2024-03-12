import { User } from "../models/user";


export interface UserRepository {
    create: (newUser: User) => void;
}