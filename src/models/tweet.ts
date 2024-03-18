import { randomUUID } from "crypto";
import { User } from "./user";
import { Like } from "./like";
import { likes } from "../databases/like.database";

export type Type = "Normal" | "Reply"

export class Tweet {
    private _id: string = randomUUID()
    private _likes: Like[] = [];
    private _replies: Tweet[] = [];

    constructor(
        private _content: string,
        private _type: Type,
        private _user: User
    ) { }

    public get id(): string {
        return this._id
    }

    public get likes(): Like[] {
        return this._likes
    }

    public get content(): string {
        return this._content
    }

    public get type(): string {
        return this._type
    }

    public get user(): User {
        return this._user
    }

    reply(content: string, user: User) {
        const replyTweet = new Tweet(content, "Reply", user)
        this._replies.push(replyTweet);
    }

    like(user: User): void {
        const newLike = new Like(user, this)
        likes.push(newLike);
    }

    show(tweet: Tweet, followers: User[]): void {
        this.showTweetUserLogged(tweet);
        this.showTweetsFollowers(followers);
    }

    private showTweetUserLogged(tweet: Tweet): void {
        let counter: number = this._likes.length;
        let whoLiked: string = "";

        likes.forEach((like) => {
            if (like.tweet.id === tweet.id) {
                counter++;
                whoLiked = like.from.username;
            }
        });

        console.log(this.formattedTweets(tweet.user.username, this.content, whoLiked, counter),
            this.showReplies(tweet));
    }

    private showTweetsFollowers(followers: User[]): void {
        let counter: number = 0
        let whoLiked: string = ""

        followers.forEach(follow => {
            follow.tweets.forEach(tweetsFollowers => {
                counter = 0
                likes.forEach((like) => {
                    if (like.tweet._id === tweetsFollowers._id) {
                        counter++

                        whoLiked = like.from.username
                    }
                })
                console.log(this.formattedTweets(tweetsFollowers._user.username, tweetsFollowers._content, whoLiked, counter),this.showReplies(tweetsFollowers))
                
            })
        })
    }

    private formattedTweets(username: string, content: string, whoLiked: string, likeAccountTweet: number): string {

        let likesFormatted: string = ""
        if (likeAccountTweet === 1) {
            likesFormatted = `@${whoLiked} liked this`
        }
        if (likeAccountTweet === 2) {
            likesFormatted = `@${whoLiked} and other ${likeAccountTweet - 1} user liked this`
        }
        if (likeAccountTweet > 2) {
            likesFormatted = `@${whoLiked} and other ${likeAccountTweet - 1} users liked this\n`
        }

        return `\n@${username}: ${content}\n${likesFormatted}`
    }

    private showReplies(tweet: Tweet): string {
        
        let replyFormatted = "";
        this._replies.forEach((reply) => {
            replyFormatted += `  > @${reply.user.username}: ${reply.content}\n `;
        });
        return replyFormatted;
    }
}
