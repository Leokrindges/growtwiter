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

    // Objetivo: Adicionar Tweets
    public sendTweet(newTweet: Tweet): void {
        // const newTweet = new Tweet(content,"Normal",this)

        if (newTweet.user._username === this._username) {
            this.tweets.push(newTweet)
        } else {
            throw Error("Não é possivel adicionar enviar tweet criado por outra pessoa")
        }
    }

    // Objetivo: adicionar seguidores
    public follow(followers: User) {
        if (followers._username === this._username) {
            throw Error("Can't follow your")
        }
        this._followers.push(followers)
    }

    // Objetivo: Mostrar a lista de seguidores do usuário logado
    public showFollowers(): void{
        console.log(`Followers of ${this._username}\n------------------------------------\n`);
        this._followers.forEach(follow => {
            console.log("Username: ",follow._username,"\n------------------------------------");
            
        })
    }

    // Objetivo: Mostrar feed do usuário
    public showFeed(): void {
        this.showTweet()
    }

    // Objetivo mostrar tweetes do
    private showTweet() {

        console.log(`FEED DE TWEETS DO ${this._username.toLocaleUpperCase()} `);

        this.tweets.forEach(tweet => {
            tweet.show(tweet, this.followers)
        });


    }
    // Objetivo: Validar os dados de entrada
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

   // Objetiv: Verificar se username já esta cadastrado
    private checkUsername(): void {
        const existsUsername = users.some((user) => user.username === this.username);

        if (existsUsername) {
            throw Error('Já existe esse username')
        }
    }

    // Objetiv: Verificar se email já esta cadastrado
    private checkEmail(): void {
        const existsEmail = users.some((user) => user.email === this.email)

        if (existsEmail) {
            throw Error('Já existe esse e-mail cadastrado')
        }
    }

    // Objetivo: criar usuários
    public createUsers(newUser: User): void {
        this.validateData()
        users.push(newUser)
    }
}