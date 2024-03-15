import { randomUUID } from 'crypto';
import { Tweet } from './tweet';
import { UserRepositoryInMemory } from '../repositories/user.repository';
import { TweetRepositoryInMemory } from '../repositories/tweet.repository';

export class User {
    private _id: String = randomUUID();
    private _followers: String[] = []
    private _tweets: Array<Tweet> = []

    constructor(
        private _name: string,
        private _username: string,
        private _email: string,
        private _password: string,
    ) {
        this.validateData()
    }

    public get name(): string {
        return this._name
    }    
    public get username(): string {
        return this._username
    }
    public get email(): string {
        return this._email
    }
    public get password(): string {
        return this.password
    }
    public get tweets(): Tweet[] {
        return this.tweets
    }

    private validateData(): void {
        this.checkPassword()
    }

    //enviar tweet
    public sendTweet(content: string): void {
        const newTweet = new Tweet(content,"Normal",this)
        new UserRepositoryInMemory().addTweet(newTweet)
    }

    //seguir
    public follow() {

    }

    //Mostrar feed
    public showFeed() { }

    //Mostrar Tweets
    showTweet() {
        this._tweets.forEach(tweet => {
            tweet.show(this._username)
        });
    }

    //Verifica se a senha tem no minímo 8 caracteres e também caracteres especiais.
    private checkPassword() {
        const dictionaryCharacters = ["!", "@", "#", "$", "%", "&"];
        let containsSpecialCharacter = false;

        if (this._password.length < 8) {
            throw new Error("Senha deve ter no mínimo 8 caracteres.");
        }

        for (let i = 0; i <= this._password.length; i++) {

            for (let j = 0; j < dictionaryCharacters.length; j++) {
                if (dictionaryCharacters[j] === this._password[i]) {
                    containsSpecialCharacter = true;
                    break;  // Sai do loop interno assim que uma correspondência é encontrada.
                }
            }
            if (containsSpecialCharacter) {
                this._password = this._password;
                break
            }
            if (i === this._password.length && !containsSpecialCharacter) {
                throw new Error("Senha deve ter pelo menos um caractere especial.");
            }
        }
    }


}