import { randomUUID } from "crypto";
import { User } from "./user";
import { Tweet } from "./tweet";

export class Like {
    id: string = randomUUID()
    constructor(
        private _from: User,
        private _tweet: Tweet
    ) { }


    public get from(): User {
        return this._from
    }

    public get tweet(): Tweet {
        return this._tweet
    }
}