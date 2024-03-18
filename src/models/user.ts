import { randomUUID } from 'crypto';
import { Tweet } from './tweet';
import { users } from '../databases/user.databese';
import { tweets } from '../databases/tweet.database';

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
        if (newTweet.user._username != this._username) {
            throw Error("It is not possible to add send a tweet created by someone else")
        }
        if (newTweet.type !== "Normal") {
            throw new Error("Invalid reply type. Type must be 'Normal'");
        }
        tweets.push(newTweet)

    }

    // Objetivo: adicionar seguidores
    public follow(followers: User) {
        if (followers._username === this._username) {
            throw Error("Can't follow your")
        }
        this._followers.push(followers)
    }

    // Objetivo: Mostrar a lista de seguidores do usuário logado
    public showFollowers(): void {
        console.log(`FOLLOWERS OF ${this._username.toLocaleUpperCase()}\n------------------------------------\n`);
        this._followers.forEach(follow => {
            console.log("Username: ", follow._username, "\n------------------------------------");

        })
    }

    // Objetivo: Mostrar feed do usuário
    public showFeed(): void {
        this.showTweet()
    }

    // Objetivo mostrar tweetes do
    private showTweet() {

        console.log(`\nTWEETS FEED ${this._username.toLocaleUpperCase()} `);

       // Inclui os próprios tweets do usuário no feed
       const tweetsUserLogged = tweets.filter(tweet => this._id === tweet.user._id)
       tweetsUserLogged.forEach(tweet => {
        tweet.show(tweet, this._followers);

    });

    // Obtém uma lista dos IDs dos usuários que o usuário logado segue
    const followedUserIds = this._followers.map(follower => follower.id);

    // Filtra os tweets para mostrar apenas os tweets dos usuários seguidos
    const tweetsToShow = tweets.filter(tweet => followedUserIds.includes(tweet.user.id) && tweet.user.id !== this.id);

    // Exibe os tweets filtrados
    tweetsToShow.forEach(tweet => {
        tweet.show(tweet, this._followers);
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

        var passwordValidator = require('password-validator'); 

        var schema = new passwordValidator();

        schema.is().min(8)
        schema.has().uppercase()
        schema.has().lowercase()
        schema.has().digits(2)

        
        if(!schema.validate(this._password)){
            throw new Error("The password must have no capital letters, 2 numbers and at least 8 characters in total");

        }

        //OUTRA MANEIRA DE FAZER SEM USAR IMPORTAÇÃO DA NPM VALIDATOR PASSWORD

        // const dictionaryCharacters = ["!", "@", "#", "$", "%", "&"];
        // let containsSpecialCharacter = false;

        // if (this._password.length < 8) {
        //     throw new Error("Password must have at least 8 characters.");
        // }

        // for (let i = 0; i <= this._password.length; i++) {

        //     for (let j = 0; j < dictionaryCharacters.length; j++) {
        //         if (dictionaryCharacters[j] === this._password[i]) {
        //             containsSpecialCharacter = true;
        //             break;  // Sai do loop interno assim que uma correspondência é encontrada.
        //         }
        //     }
        //     if (containsSpecialCharacter) {
        //         this._password = this._password;
        //         break
        //     }
        //     if (i === this._password.length && !containsSpecialCharacter) {
        //         throw new Error("Password must have at least one special character.");
        //     }
        // }
    }

    // Objetiv: Verificar se username já esta cadastrado
    private checkUsername(): void {
        const existsUsername = users.some((user) => user.username === this.username);

        if (existsUsername) {
            throw Error('This username already exists')
        }
    }

    // Objetiv: Verificar se email já esta cadastrado
    private checkEmail(): void {
        const existsEmail = users.some((user) => user.email === this.email)

        if (existsEmail) {
            throw Error('This email already exists registered')
        }
    }

    // Objetivo: criar usuários
    public createUsers(newUser: User): void {
        this.validateData()
        users.push(newUser)
    }
}