import { randomUUID } from "crypto";
import { User } from "./user";
export type Type = "Normal" | "Reply"

export class Tweet {
    private _id: string = randomUUID()

    constructor(
        private _content: string,
        private _type: Type,
        private _user: User
    ) { }

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

    public set type(newType: Type) {
        this._type = newType
    }

    public set content(newContent: string) {
        this._content = newContent
    }

    //responder
    reply(content: string) { }

    like() { }

    //mostrar
    show(username: string) {
        console.log(`@<${username}>: <${this._content}>
         <likes> *
        <replies>`);

    }

    //mostrar respostas
    showReplies() { }
}