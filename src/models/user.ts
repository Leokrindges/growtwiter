import { randomUUID } from 'crypto';
import { Tweet } from './tweet';
import { UserRepositoryInMemory } from '../repositories/user.repository';

export class User {
    private id: String = randomUUID();
    private followers: String[] = []

    constructor(
        private _name: string,
        private _username: string,
        private _email: string,
        private _password: string,
    ) {
        this.validateData()
    }

    private validateData(): void {
        this.checkPassword()

    }

    public set name(newName: string) {
        this._name = newName;
    }

    public get username(): string {
        return this._username
    }
    public get email(): string {
        return this._email
    }

    public set username(newUsername: string) {
        this._username = newUsername
    }

    public set email(newEmail: string) {
        this._email = newEmail;
    }

    //enviar tweet
    public sendTweet(newTweet: Tweet) {

    }

    //seguir
    public follow() {

    }

    //Mostrar feed
    public showFeed() { }

    //Mostrar Tweets
    showTweet() { }

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