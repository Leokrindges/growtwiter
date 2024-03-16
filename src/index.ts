import { users } from "./databases/user.databese";
import { Tweet } from "./models/tweet";
import { User } from "./models/user";



//CRIA USUARIOS
const leonardo = new User("Leonardo", "leo","leo@leo.com","123%45689")
const pedro = new User("pedro", "pedro","pedro@pedro.com","123456@89")
const je = new User("je", "je","je@je.com","123456@89")

//ADD USER
leonardo.createUsers(leonardo)
// pedro.createUsers(pedro)

const tweet1 = new Tweet("primeiro tweet", "Normal", leonardo);

const tweet2 = new Tweet("segundo tweet", "Normal", leonardo);
const tweet3 = new Tweet("primeiro tweet", "Normal", pedro);


//ENVIA TWEET
leonardo.sendTweet(tweet1)
leonardo.sendTweet(tweet2)
pedro.sendTweet(tweet3)
// leonardo.sendTweet("segundo tweet leonardo")

// pedro.sendTweet("primeiro tweet pedro")
// pedro.sendTweet("segundo tweet pedro")

//CURTIR TWEET
tweet1.like(leonardo)
tweet1.like(je)
tweet1.like(pedro)

leonardo.showFeed()
// pedro.showFeed()

