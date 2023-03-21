import { Timestamp } from "firebase/firestore";

export class User{
    photo!: string;
    constructor( public nomdutilisateur: string, public gid: number, public email: string, public etat: Boolean ,public uid:String|undefined,  public datecreation: number , public datemodification: number ){}
}    


