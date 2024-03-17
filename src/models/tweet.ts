import { randomUUID } from "crypto";
import { User } from "./user";
import { Like } from "./like";
import { likes } from "../databases/like.database";
import { tweets } from "../databases/tweet.database";
import { log } from "console";
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

    //Objetivo: responder os Tweets 
    reply(content: string) { }

    // Objetivo: Curtir os tweets
    public like(user: User): void {
        const newLike = new Like(user, this)
        likes.push(newLike)
    }

    // Objetivo: Mostrar todos tweets do usuario e seus seguidores
    public show(tweet: Tweet, followers: User[]): void {

        this.showTweetUserLogged(tweet)
        console.log("----------------------------------------`");

        this.showTweetsFollowers(followers)

        // <replies>`
    }

    //Objetivo: mostrar os tweets do usuário logado
    private showTweetUserLogged(tweet: Tweet): void {
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
    
    // Mostrar os tweets dos seguidores do usuário logado
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
            likesFormatted = `@<${whoLiked}> liked this\n----------------------------------------`
        }
        if (likeAccountTweet === 2) {
            likesFormatted = `@<${whoLiked}> and other ${likeAccountTweet - 1} user liked this\n----------------------------------------`
        }
        if (likeAccountTweet > 2) {
            likesFormatted = `@<${whoLiked}> and other ${likeAccountTweet - 1} users liked this\n----------------------------------------`
        }

        return `@<${username}>: <${content}>\n${likesFormatted}`
    }


    //mostrar respostas
    showReplies() { }
}