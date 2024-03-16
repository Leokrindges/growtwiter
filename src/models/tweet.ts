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

    public show(tweet: Tweet): void {
        let showLikesFormatted: string = this.showLikes(tweet)
        console.log(`@<${tweet._user.username}>: <${this._content}>\n${showLikesFormatted}`);

        // <likes> ${this.countLikeTweet(this)}
        // <replies>`
    }



    private showLikes(tweet: Tweet): string {
        let contador: number= 0
        let whoLiked: string = ""

        likes.forEach((like) => {
            if (like.tweet._id === tweet._id) {                
                contador++
                
                whoLiked = like.from.username                
            }
        });
        
        if (contador === 1) {
            return `@<${whoLiked}> curtiu`
        } 
        if (contador === 2) {
            return `@<${whoLiked}> e mais ${likes.length - 1} usuário curtiu`
        }
        if (contador > 2) {
            return `@<${whoLiked}> e mais ${likes.length - 1} usuários curtiram`
        }
        return ""
    }



    //mostrar respostas
    showReplies() { }
}