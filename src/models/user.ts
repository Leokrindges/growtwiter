import { error } from 'console';
import { randomUUID } from 'crypto';
import { Tweet } from './tweet';

export class User {
    private id: String = randomUUID();
    constructor(
        private _name: string,
        private _usernames: string[] = [],
        private _email: string,
        private _password: string,
        private _tweet: Tweet[] = []
    ) { }

    public set name(newName: string) {
        this._name = newName;
    }

    public set username(newUsername: string) {
        if (this.checkAvailabilityUsername(newUsername)) {
            throw error("Já existe um usário com este Username, por favor, escolha outro.")
        }
        this._usernames.push(newUsername)
    }

    public set email(newEmail: string) {
        this._email = newEmail;
    }

    public set password(newPassword: string) {
        if (!this.checkPassword(newPassword)) {
            throw error(`Senha deve ter no minímo 8 caracteres e um caracter especial.\n`)
        }
        this._password = newPassword
    }

    //Verifica disponibilidade do username
    private checkAvailabilityUsername(newUsername: string): boolean {
        const existeUsername = this._usernames.find((username) => username = newUsername)

        if (existeUsername) {
            return true
        }
        return false
    }

    //Verifica se a senha tem no minímo 8 caracteres e também caracteres especiais.
    private checkPassword(newPassword: string): boolean {
        const dictionaryCharacters = ["!", "@", "#", "$", "%", "&"]

        for (let i = 0; i < newPassword.length; i++) {
            const auxChar = newPassword.substring(i, i)
            dictionaryCharacters.forEach(character => {
                if (newPassword.length > 8 && character === auxChar) {
                    return true
                }
            });
        }
        return false
    }

    //enviar tweet
    public sendTweet(tweet: string) { }

    //seguir
    public follow() { }

    //Mostrar feed
    public showFeed() { }

    //Mostrar Tweets
    showTweet() { }




}