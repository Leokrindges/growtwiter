import { randomUUID } from "crypto";

export type Type = "Normal" | "Reply"

export class Tweet{
    id: string = randomUUID()
    constructor(
        private _content: string,
        private _type: Type
    ){}

    //Conteúdo
    public get content(): string{
        return this._content
    }

    //tipo
    public get type(): string{
        return this._type
    }

    //responder
    reply(content: string){}

    like(){}

    //mostrar
    show(){}

    //mostrar respostas
    showReplies(){}
}