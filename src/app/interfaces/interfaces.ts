export interface IUsuarioGithub {
    
    avatar_url: string;
    email: string;
    followers: number;
    login: string;
    name: string;
    html_url: string;

}

export interface ILogin{
    email : string,
    password : string
}

export interface IRegistro extends ILogin{
    nombre:string;
    apellido:string;
    edad:string;
}
