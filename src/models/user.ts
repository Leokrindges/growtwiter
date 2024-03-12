import { error } from 'console';
import { randomUUID } from 'crypto';
import { Tweet } from './tweet';

export class User {
    private id: String = randomUUID();
    private _tweet: Tweet[] = []
    private usernames: string[] = []

    constructor(
        private _name: string,
        private _username: string,
        private _email: string,
        private _password: string,
    ) {
        this.validateData()
    }

    public set name(newName: string) {
        this._name = newName;
    }

    private validateData() {
        this.checkPassword(this._password)
        this.checkAvailabilityUsername(this._username)
    }

    public set username(newUsername: string) {
        this.checkAvailabilityUsername(newUsername)

    }

    public set email(newEmail: string) {
        this._email = newEmail;
    }

    public set password(newPassword: string) {
        this.checkPassword(newPassword)
    }


    //enviar tweet
    public sendTweet(newTweet: Tweet) {
        this.formatTweet(newTweet)

        this._tweet.push(newTweet)
    }

    private formatTweet(newTweet: Tweet): string {
        const formattedTweet: string = `@${this.usernames}: ${newTweet.content}`

        return formattedTweet
    }

    //seguir
    public follow() { }

    //Mostrar feed
    public showFeed() { }

    //Mostrar Tweets
    showTweet() { }


    //Verifica disponibilidade do username
    private checkAvailabilityUsername(newUsername: string) {
        console.log("entrou");

        if (this.usernames.length === 0) {
            console.log(this.usernames.length);

            this.usernames.push(newUsername)
            console.log("armazenou");

        }
        if (this.usernames.length > 0) {
            const existeUsername = this.usernames.find((username) => username = newUsername)
            console.log(existeUsername);
            if (existeUsername) {
                throw error("Já existe um usário com este Username, por favor, escolha outro.")
            } else {
                this.usernames.push(newUsername)
                return
            }
        }


    }

    //Verifica se a senha tem no minímo 8 caracteres e também caracteres especiais.
    private checkPassword(newPassword: string) {
        const dictionaryCharacters = ["!", "@", "#", "$", "%", "&"];
        let containsSpecialCharacter = false;

        if (newPassword.length < 8) {
            throw new Error("Senha deve ter no mínimo 8 caracteres.");
        }

        for (let i = 0; i <= newPassword.length; i++) {

            for (let j = 0; j < dictionaryCharacters.length; j++) {
                if (dictionaryCharacters[j] === newPassword[i]) {
                    containsSpecialCharacter = true;
                    break;  // Sai do loop interno assim que uma correspondência é encontrada.
                }
            }
            if (containsSpecialCharacter) {
                this._password = newPassword;
                break
            }
            if (i === newPassword.length && !containsSpecialCharacter) {
                throw new Error("Senha deve ter pelo menos um caractere especial.");
            }
        }
    }


}