import { User } from "./models/user";
import { UserRepositoryInMemory } from "./repositories/user.repository";

const usersFeatures = new UserRepositoryInMemory()

const user1 = new User("Leonardo", "leo","leo@leo.com","123%45689")
const user2 = new User("pedro", "pedro","pedro@pedro.com","123456@89")
const user3 = new User("pedro", "je","je@je.com","123456@89")

usersFeatures.create(user1)
usersFeatures.create(user2)
usersFeatures.create(user3)



