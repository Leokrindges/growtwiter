import { randomUUID } from "crypto";
import { User } from "./user";
import { Like } from "./like";
import { likes } from "../databases/like.database";
import { tweets } from "../databases/tweet.database";
export type Type = "Normal" | "Reply"

export class Tweet {
    private _id: string = randomUUID()
    private _likes: Like[] = [];

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
    //Conteúdo
    public get content(): string {
        return this._content
    }

    //tipo
    public get type(): string {
        return this._type
    }
    public get user(): User {
        return this._user
    }

    //responder
    reply(content: string) { }

    public like(user: User): void {
        const newLike = new Like(user, this)

        likes.push(newLike)
    }

    public show(tweet: Tweet, followers: User[]): void {
        // const showLikesFormatted: string = this.showLikes(tweet)
        // console.log(`@<${tweet._user.username}>: <${this._content}>\n${showLikesFormatted}`);
        this.showLikes(tweet)
        this.showTweetsFollowers(followers)


        // <likes> ${this.countLikeTweet(this)}
        // <replies>`
    }
    private showLikes(tweet: Tweet): void {
        let counter: number = 0
        let whoLiked: string = ""

        likes.forEach((like) => {
            if (like.tweet._id === tweet._id) {
                counter++

                whoLiked = like.from.username
            }
        });
        console.log(this.formattedTweets(tweet._user.username, this.content, whoLiked, counter)
        );

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
                console.log(this.formattedTweets(tweetsFollowers._user.username, tweetsFollowers._content, whoLiked, counter))
            })
        })
    }

    private formattedTweets(username: string, content: string, whoLiked: string, likeAccountTweet: number): string {
        let likesFormatted: string = ""
        if (likeAccountTweet === 1) {
            likesFormatted = `@<${whoLiked}> curtiu\n`
        }
        if (likeAccountTweet === 2) {
            likesFormatted = `@<${whoLiked}> e mais ${likeAccountTweet - 1} usuário curtiu\n`
        }
        if (likeAccountTweet > 2) {
            likesFormatted = `@<${whoLiked}> e mais ${likeAccountTweet - 1} usuários curtiram\n`
        }

        return `@<${username}>: <${content}>\n${likesFormatted}`
    }


    //mostrar respostas
    showReplies() { }
}