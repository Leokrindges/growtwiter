import { Tweet } from "./models/tweet";
import { User } from "./models/user";
import { TweetRepositoryInMemory } from "./repositories/tweet.repository";
import { UserRepositoryInMemory } from "./repositories/user.repository";


const usersFeatures = new UserRepositoryInMemory()
const tweetFeatures = new TweetRepositoryInMemory()

//CRIA USUARIOS
const user1 = new User("Leonardo", "leo","leo@leo.com","123%45689")
const user2 = new User("pedro", "pedro","pedro@pedro.com","123456@89")


//ADD USER
usersFeatures.create(user1)
usersFeatures.create(user2)

//CRIA TWEET
// tweetFeatures.createTweet(tweet1)
// tweetFeatures.createTweet(tweet2)

//ENVIA TWEET
user1.sendTweet("primeiro tweet")
// user1.sendTweet(tweet2)


