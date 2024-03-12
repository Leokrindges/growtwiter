import { Tweet } from "../models/tweet";


export interface TweetRepository {
    createTweet: (newTweet: Tweet) => void;
}