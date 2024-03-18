import { Tweet } from "./models/tweet";
import { User } from "./models/user";



//CRIA USUARIOS
const leonardo = new User("Leonardo", "leo","leo@leo.com","Leo123Leo")
const pedro = new User("pedro", "pedro","pedro@pedro.com","Pedro123pedro")
const je = new User("je", "je","je@je.com","Je123jeje")

//ADD USER
leonardo.createUsers(leonardo)
pedro.createUsers(pedro)
je.createUsers(je)

const tweet1 = new Tweet("first tweet leo", "Normal", leonardo);
const tweet2 = new Tweet("second tweet leo", "Normal", leonardo);
const tweet3 = new Tweet("first tweet pedro", "Normal", pedro);
const tweet4 = new Tweet("firts tweet je", "Normal", je);


//ENVIA TWEET
leonardo.sendTweet(tweet1)
leonardo.sendTweet(tweet2)
pedro.sendTweet(tweet3)
je.sendTweet(tweet4)

pedro.follow(leonardo)
pedro.follow(je)

//CURTIR TWEET
tweet1.like(leonardo)
tweet1.like(je)
tweet2.like(je)
tweet1.like(pedro)
tweet4.like(pedro)

//RESPONDER UM TWEET
tweet1.reply("First reply to Leo's tweet", leonardo)
tweet1.reply("second reply to leo's tweet", je)


// pedro.showFollowers()
pedro.showFeed()
leonardo.showFeed()
je.showFeed()