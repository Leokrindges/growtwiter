import { randomUUID } from 'crypto';
import { Tweet } from './tweet';
import { Like } from './like';
import { users } from '../databases/user.databese';

export class User {
    private _id: string = randomUUID()
    private _followers: User[] = []
    private _tweets: Tweet[] = []

    constructor(
        private _name: string,
        private _username: string,
        private _email: string,
        private _password: string,
    ) {
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
    public get id(): string {
        return this._id
    }
    public get followers(): User[] {
        return this._followers
    }
    public get tweets(): Tweet[] {
        return this._tweets
    }

    //enviar tweet
    public sendTweet(newTweet: Tweet): void {
        // const newTweet = new Tweet(content,"Normal",this)
        
        if(newTweet.user._username === this._username){
            this.tweets.push(newTweet)
        }else{
            throw Error("Não é possivel adicionar enviar tweet criado por outra pessoa")
        }       
    }

    //seguir
    public follow() {

    }

    //Mostrar feed
    public showFeed(): void {
        this.showTweet()
    }

    //Mostrar Tweets
    public showTweet() {
        
        console.log(`FEED DE TWEETS DO ${this._username} `);
        console.log();
        
        this.tweets.forEach(element => {
            element.show(element)
            console.log();
        });
    }
    private validateData(): void {
        this.checkPassword()
        this.checkUsername()
        this.checkEmail()
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

    private checkUsername(): void {
        const existsUsername = users.some((user) => user.username === this.username);

        if (existsUsername) {
            throw Error('Já existe esse username')
        }
    }

    private checkEmail(): void {
        const existsEmail = users.some((user) => user.email === this.email)

        if (existsEmail) {
            throw Error('Já existe esse e-mail cadastrado')
        }
    }

    public createUsers(newUser: User): void {
        this.validateData()       
        users.push(newUser)        
    }
}