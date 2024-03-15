import { TweetRepository } from "../contracts/tweet-repository.contracts";
import { tweets } from "../databases/tweet.database";
import { users } from "../databases/user.databese";
import { Tweet } from "../models/tweet";


export class TweetRepositoryInMemory implements TweetRepository {

    public createTweet(newTweet: Tweet): void {
        tweets.push(newTweet)        
    }
}